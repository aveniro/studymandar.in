import {createStore, createEvent} from 'effector';

export const sentencesState = createStore([]);

export const sentencesApi = {
    addSentence: createEvent(),
    updateSentences: createEvent()
};

sentencesState.on(sentencesApi.addSentence, (oldSentencesState, newSentence) => [...oldSentencesState, newSentence]);

sentencesState.on(sentencesApi.updateSentences, (oldSentencesState, newSentence) => newSentence);