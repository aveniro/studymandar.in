import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

import {route} from 'preact-router';

import firebaseConfig from 'config/firebase';

import {userApi} from 'state/user';
import {wordsApi} from 'state/words';
import {sentencesApi} from 'state/sentences';
import {loadApi} from 'state/ui';

firebase.initializeApp(firebaseConfig);

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

export default firebase;