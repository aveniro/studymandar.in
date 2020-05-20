import {createApi, createStore} from 'effector';
import {userState}              from 'state/user';
import {v4 as uuidv4}           from 'uuid';

import firebase from '@/firebase';

export const wordsState = createStore([]);

const updateWord = (oldWordsState, word) => {
    const index = oldWordsState.findIndex(el => el.id === word.id);
    if(index !== -1) {
        firebase.firestore().collection('users').doc(userState.getState().uid).collection('words').doc(word.id).set({
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

        oldWordsState[index] = word;
    } 

    return [...oldWordsState];
};

export const wordsApi = createApi(wordsState, {
    addWord: (oldWordsState, newWord) => {
        const id = uuidv4();

        // TODO: .catch()
        firebase.firestore().collection('users').doc(userState.getState().uid).collection('words').doc(id).set(newWord);

        return [...oldWordsState, {...newWord, id}];
    },
    deleteWord: (oldWordsState, word) => {
        const index = oldWordsState.findIndex(el => el.id === word.id);

        if(index !== -1) {
            firebase.firestore().collection('users').doc(userState.getState().uid).collection('words').doc(word.id).delete();
            oldWordsState.splice(index, 1);
        }
        
        return oldWordsState;
    },
    updateWord,
    ocrCorrect: (oldWordsState, word) => {
        ++word.ocrTested || (word.ocrTested = 1);
        ++word.ocrCorrect || (word.ocrCorrect = 1);

        word.ocrRatio = (word.ocrTested > 0 ? word.ocrCorrect / word.ocrTested : 0).toFixed(2);

        return updateWord(oldWordsState, word);
    },
    ocrIncorrect: (oldWordsState, word) => {
        ++word.ocrTested || (word.ocrTested = 1);
        word.ocrCorrect || (word.ocrCorrect = 0);

        word.ocrRatio = (word.ocrTested > 0 ? word.ocrCorrect / word.ocrTested : 0).toFixed(2);

        return updateWord(oldWordsState, word);
    },
    vocabCorrect: (oldWordsState, word) => {
        ++word.vocabTested || (word.vocabTested = 1);
        ++word.vocabCorrect || (word.vocabCorrect = 1);

        word.vocabRatio = (word.vocabTested > 0 ? word.vocabCorrect / word.vocabTested : 0).toFixed(2);

        return updateWord(oldWordsState, word);
    },
    vocabIncorrect: (oldWordsState, word) => {
        ++word.vocabTested || (word.vocabTested = 1);
        word.vocabCorrect || (word.vocabCorrect = 0);

        word.vocabRatio = (word.vocabTested > 0 ? word.vocabCorrect / word.vocabTested : 0).toFixed(2);

        return updateWord(oldWordsState, word);
    },
    updateWords: (oldWordsState, newWordsState) => newWordsState
});