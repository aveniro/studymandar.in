import {userApi} from 'state/user';
import {loadApi}            from 'state/ui';
import {route} from 'preact-router';
import {toast} from '@/component/Toaster';
import {wordsApi}           from 'state/words';
import {sentencesApi}       from 'state/sentences';

export function integrateAuthentication(firebase) {
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
                    const wordsPromise = snapshot.ref.collection('words').get().then(wordsSnapshot => {
                        const wordsArray = [];
                        wordsSnapshot.forEach(word => {
                            wordsArray.push({...word.data(), id: word.id});
                        });

                        wordsApi.updateWords(wordsArray);
                    });

                    const sentencesPromise = snapshot.ref.collection('sentences').get().then(sentencesSnapshot => {
                        const sentencesArray = [];
                        sentencesSnapshot.forEach(sentence => {
                            sentencesArray.push({...sentence.data(), id: sentence.id});
                        });
                        
                        sentencesApi.updateSentences(sentencesArray);
                    });

                    const picturePromise = firebase.app().storage().refFromURL(userData.profilePicture).getDownloadURL().then(url => {
                        user.profilePicture = url;
                    });

                    Promise.all([wordsPromise, sentencesPromise, picturePromise]).then(() => {
                        userApi.updateUser(user);
                        loadApi.stop();
                    });
                }
            });

            if(!['/', '/settings'].includes(window.location.pathname)) {
                route('/');
            }
        } else {
            if(window.location.pathname !== '/start') {
                route('/welcome');
            }        

            userApi.updateUser(user);
            loadApi.stop();
        }
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

                    userApi.rejectLoginRegister();
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

            if(e.code !== 'auth/user-not-found') userApi.rejectLoginRegister();
        });
    });
}