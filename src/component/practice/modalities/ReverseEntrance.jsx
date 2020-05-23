import PracticeModality from '@/component/practice/modalities/PracticeModality';
import {wordsState} from 'state/words';

export default class ReverseEntrance extends PracticeModality {
    questionType = PracticeModality.QUESTION_TEXTUAL;
    responseType = PracticeModality.RESPONSE_WRITTEN;

    responseTitle = 'Chinese Script';
    responseHint = '中文';

    getQuestion() {
        const words = wordsState.getState();
        const word = words[Math.floor(Math.random() * words.length)];

        return {
            question: `How would you say "${word.translation}" in Chinese?`,
            answer: word.script
        };
    }

    onCorrect() {
        super.onCorrect();
    }

    onIncorrect() {
        super.onIncorrect();
    }
};