import {createStore, createEvent} from 'effector';

export const wordsState = createStore([]);

export const wordsApi = {
    updateWord: createEvent(),
    addWord: createEvent(),
    deleteWord: createEvent(),
    ocrCorrect: createEvent(),
    ocrIncorrect: createEvent(),
    vocabCorrect: createEvent(),
    vocabIncorrect: createEvent(),
    updateWords: createEvent()
};

wordsState.on(wordsApi.updateWord, (oldWordsState, word) => {
    const index = oldWordsState.findIndex(el => el.id === word.id);
    if(index !== -1) {
        oldWordsState[index] = word;
    } else {
        oldWordsState.push(word);
    }

    return [...oldWordsState];
});

wordsState.on(wordsApi.addWord, (oldWordsState, newWord) => [...oldWordsState, newWord]);

wordsState.on(wordsApi.deleteWord, (oldWordsState, word) => {
    const index = oldWordsState.findIndex(el => el.id === word.id);

    if(index !== -1) {
        oldWordsState.splice(index, 1);
    }
    
    return [...oldWordsState];
});

wordsState.on(wordsApi.ocrCorrect, (oldWordsState, word) => {
    ++word.ocrTested || (word.ocrTested = 1);
    ++word.ocrCorrect || (word.ocrCorrect = 1);

    word.ocrRatio = (word.ocrTested > 0 ? word.ocrCorrect / word.ocrTested : 0).toFixed(2);

    wordsApi.updateWord(word);
});

wordsState.on(wordsApi.ocrIncorrect, (oldWordsState, word) => {
    ++word.ocrTested || (word.ocrTested = 1);
    word.ocrCorrect || (word.ocrCorrect = 0);

    word.ocrRatio = (word.ocrTested > 0 ? word.ocrCorrect / word.ocrTested : 0).toFixed(2);

    wordsApi.updateWord(word);
});

wordsState.on(wordsApi.vocabCorrect, (oldWordsState, word) => {
    ++word.vocabTested || (word.vocabTested = 1);
    ++word.vocabCorrect || (word.vocabCorrect = 1);

    word.vocabRatio = (word.vocabTested > 0 ? word.vocabCorrect / word.vocabTested : 0).toFixed(2);

    wordsApi.updateWord(word);
});

wordsState.on(wordsApi.vocabIncorrect, (oldWordsState, word) => {
    ++word.vocabTested || (word.vocabTested = 1);
    word.vocabCorrect || (word.vocabCorrect = 0);

    word.vocabRatio = (word.vocabTested > 0 ? word.vocabCorrect / word.vocabTested : 0).toFixed(2);

    wordsApi.updateWord(word);
});

wordsState.on(wordsApi.updateWords, (oldWordsState, newWordsState) => newWordsState);