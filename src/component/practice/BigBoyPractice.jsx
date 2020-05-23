import {h, Component} from 'preact';

// Practices
import {CharacterRecognition, ReverseEntrance} from '@/component/practice/modalities';

import '#/component/practice/BigBoyPractice.scss';

const practiceModalities = [CharacterRecognition, ReverseEntrance];

export default class BigBoyPractice extends Component {
    state = {
        ratio: 0,
        good: true,
        correct: 0,
        total: 0,
        modality: practiceModalities[Math.floor(Math.random() * practiceModalities.length)]
    };

    totalQuestions = this.props.totalQuestions || 10;
    goodThreshold = this.props.goodThreshold || 0.3;

    nextQuestion = () => {
        const modality = practiceModalities[Math.floor(Math.random() * practiceModalities.length)];
        
        this.setState({modality});
    };

    update = dir => {
        const total = this.state.total + 1;
        const correct = this.state.correct + dir;
        const ratio = total > 0 ? correct / total : 1;
        const good = ratio > this.goodThreshold;

        this.setState({total, correct, ratio, modality, good});
    };

    onCorrect = () => {
        this.update(1);
        this.nextQuestion();
    };

    onIncorrect = () => {
        this.update(-1);
    };

    render(_, {good, modality, total}) {
        return (
            <div className="big-boy-practice">
                <div className="progress">
                    <div className="point-display">{total} / {this.totalQuestions}</div>
                    <div className="progress-bar-container">
                        <div data-status={good ? 'good' : 'bad'} style={{transform: `scaleX(${total / this.totalQuestions})`}} className="progress-bar"></div>
                    </div>
                </div>
                <div className="practice-window">
                    {h(modality, {onCorrect: this.onCorrect, onIncorrect: this.onIncorrect, controlled: true})}
                </div>
                <div className="bboy-practice-controls">
                    <div className="send-button">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                    </div>
                </div>
            </div>
        );
    }
}