import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

import {route} from 'preact-router';

import firebaseConfig from 'config/firebase';

import {userApi, userState} from 'state/user';
import {wordsApi} from 'state/words';
import {sentencesApi} from 'state/sentences';
import {loadApi} from 'state/ui';

import {toast} from '@/component/Toaster';

firebase.initializeApp(firebaseConfig);

firebase.firestore().enablePersistence();

// Authentication
firebase.auth().onAuthStateChanged(user => {
    if(user) {
        const collection = firebase.firestore().collection('users');
        collection.doc(user.uid).get().then(snapshot => {
            const userData = snapshot.data();

            if(!userData) {
                collection.doc(user.uid).set({ 
                    uid: user.uid,
                    email: user.email
                });

                wordsApi.updateWords([]);
            } else {
                snapshot.ref.collection('words').get().then(wordsSnapshot => {
                    const wordsArray = [];
                    wordsSnapshot.forEach(word => {
                        wordsArray.push({...word.data(), id: word.id});
                    });

                    wordsApi.updateWords(wordsArray);
                });

                snapshot.ref.collection('sentences').get().then(sentencesSnapshot => {
                    const sentencesArray = [];
                    sentencesSnapshot.forEach(sentence => {
                        sentencesArray.push({...sentence.data(), id: sentence.id});
                    });
                    
                    sentencesApi.updateSentences(sentencesArray);
                });
            }
        });

        route('/');
    } else {
        if(window.location.pathname !== '/start') {
            route('/welcome');
        }        
    }

    userApi.updateUser(user);
    loadApi.stop();
});

// Connect to words api
wordsApi.updateWord.watch(word => {
    const user = userState.getState();
    if(user && word.id) {
        firebase.firestore().collection('users').doc(user.uid).collection('words').doc(word.id).set({
            script: word.script,
            pinyin: word.pinyin,
            translation: word.translation,
    
            ocrTested: word.ocrTested || 0,
            ocrCorrect: word.ocrCorrect || 0,
            ocrRatio: word.ocrRatio || 0,
    
            vocabTested: word.vocabTested || 0,
            vocabCorrect: word.vocabCorrect || 0,
            vocabRatio: word.vocabRatio || 0
        });
    }
});

wordsApi.addWord.watch(newWord => {
    // TODO: .catch()
    firebase.firestore().collection('users').doc(userState.getState().uid).collection('words').doc(newWord.id).set(newWord);
});

wordsApi.deleteWord.watch(word => {
    firebase.firestore().collection('users').doc(userState.getState().uid).collection('words').doc(word.id).delete();
})

// Connect to sentences api
sentencesApi.addSentence.watch(newSentence => {
    firebase.firestore().collection('users').doc(userState.getState().uid).collection('sentences').add(newSentence);
});

// Connect to user api
userApi.requestLoginRegister.watch(({email, pass}) => {
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(e => {
        switch(e.code) {
        case 'auth/invalid-email': {
            toast({title: 'That email doesn\'t look quite right...'});
            break;
        }

        case 'auth/user-disabled': {
            toast({title: 'It seems like your account has been disabled...'});
            break;
        }

        case 'auth/user-not-found': {
            firebase.auth().createUserWithEmailAndPassword(email, pass).catch(e => {
                switch(e.code) {
                case 'auth/invalid-email': {
                    toast({title: 'That email doesn\'t look quite right...'});
                    break;
                }

                case 'auth/weak-password': {
                    toast({title: 'Please use a stronger password...'});
                    break;
                }
                }
            });
            break;
        }

        case 'auth/wrong-password': {
            toast({title: 'Please double-check your password...'});
            break;
        }

        default: {
            toast({title: 'Something unexpected happened, please try again later.'});
            break;
        }
        }
    });
});

export default firebase;