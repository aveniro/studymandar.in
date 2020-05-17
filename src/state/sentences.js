import {createStore, createApi} from 'effector';
import {userState, userApi} from 'state/user';

import firebase from '@/firebase';

export const sentencesState = createStore([]);

export const sentencesApi = createApi(sentencesState, {
    addSentence: (oldSentencesState, newSentence) => {
        firebase.firestore().collection('users').doc(userState.getState().uid).collection('sentences').add(newSentence);

        return [...oldSentencesState, newSentence];
    },
    updateSentences: (oldSentencesState, newSentence) => newSentence
});