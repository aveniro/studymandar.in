import * as firebase from 'firebase/app';

import firebaseConfig from 'config/firebase';

import {userState} from 'state/user';
import {wordsApi}           from 'state/words';
import {sentencesApi}       from 'state/sentences';
import {integrateAuthentication} from '@/firebase/authIntegration';

let isInitialized = false;

export function initFirebase() {
    if(isInitialized) return;

    return new Promise((resolve, reject) => {
        Promise.all([
            import(/* webpackChunkName: "FirebaseAuth" */ 'firebase/auth'),
            import(/* webpackChunkName: "FirebaseFirestore" */ 'firebase/firestore'),
            import(/* webPackChunkName: "FirebaseStorage" */ 'firebase/storage')
        ]).then(() => {
            firebase.initializeApp(firebaseConfig);
            firebase.firestore().enablePersistence();

            integrateAuthentication(firebase);

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
            });

            // Connect to sentences api
            sentencesApi.addSentence.watch(newSentence => {
                firebase.firestore().collection('users').doc(userState.getState().uid).collection('sentences').add(newSentence);
            });
        });

        isInitialized = true;
    });
}