import {h, Component, createRef} from 'preact';

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
        modality: null,
        status: 'nominal'
    };

    modalityRef = createRef();

    totalQuestions = this.props.totalQuestions || 10;
    goodThreshold = this.props.goodThreshold || 0.4;

    nextQuestion = () => {
        const modality = practiceModalities[Math.floor(Math.random() * practiceModalities.length)];
        if(modality === this.state.modality) {
            this.modalityRef.current?.next();
        }
        
        this.setState({modality, status: 'nominal'});
    };

    update = correctAns => {
        const total = this.state.total + 1;
        const correct = this.state.correct + (correctAns ? 1 : 0);
        const ratio = total > 0 ? correct / total : 1;
        const good = ratio > this.goodThreshold;
        const status = correctAns ? 'correct' : 'incorrect';

        this.setState({total, correct, ratio, good, status});
    };

    onCorrect = () => {
        this.update(true);

        //setTimeout(this.nextQuestion, 1000);
    };

    onIncorrect = correctAnswer => {
        this.update(false);

        setTimeout(() => {
            this.setState({status: 'incorrect-next'});
        }, 1000);
        console.log(correctAnswer);
    };

    send = () => {
        switch(this.state.status) {
            case 'nominal': {
                this.modalityRef.current?.check();
                break;
            }

            case 'correct': {
                this.nextQuestion();
                break;
            }

            case 'incorrect': {
                break;
            }

            case 'incorrect-next': {
                this.nextQuestion();
                break;
            }
        }
    };

    keydown = e => {
        if(e.key === 'Enter') {
            this.send();
        }
    };

    componentDidMount() {
        this.nextQuestion();
        document.addEventListener('keydown', this.keydown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydown);
    }

    render(_, {good, modality, total, status}) {
        let sendButtonIcon;
        switch(status) {
            case 'correct': {
                sendButtonIcon = (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>                );
                break;
            }

            case 'incorrect': {
                sendButtonIcon = (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                );
                break;
            }

            case 'incorrect-next': {
                sendButtonIcon = (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                );
                break;
            }

            default: {
                sendButtonIcon = (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                );
                break;
            }
        }
        return (
            <div className="big-boy-practice">
                <div className="progress">
                    <div className="point-display">{total} / {this.totalQuestions}</div>
                    <div className="progress-bar-container">
                        <div data-status={good ? 'good' : 'bad'} style={{transform: `scaleX(${total / this.totalQuestions})`}} className="progress-bar"></div>
                    </div>
                </div>
                <div className="practice-window">
                    {h(modality, {ref: this.modalityRef, onCorrect: this.onCorrect, onIncorrect: this.onIncorrect, controlled: true})}
                </div>
                <div className="bboy-practice-controls">

                    <div data-status={status} onClick={this.send} className="send-button">
                        {sendButtonIcon}
                    </div>
                </div>
            </div>
        );
    }
}