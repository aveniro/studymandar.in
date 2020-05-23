import PracticeModality from '@/component/practice/modalities/PracticeModality';
import {wordsState} from 'state/words';

export default class CharacterRecognition extends PracticeModality {
    questionType = PracticeModality.QUESTION_CHINESE_SCRIPT;
    responseType = PracticeModality.RESPONSE_WRITTEN;

    responseTitle = 'Pinyin';
    responseHint = 'zhong1 wen2';

    getQuestion() {
        const words = wordsState.getState();
        const word = words[Math.floor(Math.random() * words.length)];

        return {
            question: word.script,
            answer: word.pinyin
        };
    }

    onCorrect() {
        super.onCorrect();
    }

    onIncorrect() {
        super.onIncorrect();
    }
};