import {h, Component, createRef} from 'preact';
import Button from '@/ui/Button';
import TextInput from '@/ui/TextInput';

import '#/component/practice/modalities/PracticeModality.scss';

export default class PracticeModality extends Component {
    // Question presentation types
    static QUESTION_TEXTUAL = 'question_textual';
    static QUESTION_CHINESE_SCRIPT = 'question_chinese_script';

    // Question response types
    static RESPONSE_WRITTEN = 'response_written';

    controlled = false;

    questionType = PracticeModality.QUESTION_TEXTUAL;
    responseType = PracticeModality.RESPONSE_WRITTEN;

    // Control
    focusEl = createRef();

    // Hints
    responseTitle = 'Response';
    responseHint = 'Response Hint';

    state = {
        question: null,
        answer: null,
        multipleChoiceOptions: []
    };

    checkButton = () => {

    };

    /**
     * Check the current answer inside of the PracticeModality controlled input field
     * and call onCorrect() or onIncorrect appropriately
     */
    check = () => {
        
    };

    onKeydown = e => {
        if(e.key === 'Enter') {
            this.check();
        }
    };

    getQuestion() {
        return {
            question: 'Do you like chinese-helper?',
            answer: 'yes'
        };
    }

    next() {
        this.setState(this.getQuestion());
    }

    onCorrect() {
        this.props.onCorrect?.();
    }

    onIncorrect() {
        this.props.onCorrect?.();
    }

    componentDidMount() {
        if(!this.controlled) {
            document.addEventListener('keydown', this.onKeydown);
        }

        this.focusEl.current?.focus();

        this.next();
    }

    componentWillUnmount() {
        if(!this.controlled) {
            document.removeEventListener('keydown', this.onKeydown);
        }
    }

    render(_, {question}) {
        let questionEl;
        switch(this.questionType) {
            case PracticeModality.QUESTION_TEXTUAL: {
                questionEl = (
                    <div className="question-textual">{question}</div>
                );
                break;
            }

            case PracticeModality.QUESTION_CHINESE_SCRIPT: {
                questionEl = (
                    <div className="giant-zh-script">{question}</div>
                );
                break;
            }

            default: {
                questionEl = (
                    <div className="practice-unsupported">Practice type unsupported</div>
                );
                break;
            }
        }

        let responseEl;
        switch(this.responseType) {
            case PracticeModality.RESPONSE_WRITTEN: {
                responseEl = (
                    <div className="response-text">
                        <TextInput ref={this.focusEl} title={this.responseTitle} hint={this.responseHint} />
                    </div>
                );
                break;
            }

            default: {
                responseEl = (
                    <div className="response-unsupported">Response type unsupported</div>
                );
                break;
            }
        }

        return (
            <div className="practice-modality">
                <div className="practice-question">{questionEl}</div>
                <div className="response-area">{responseEl}</div>
                {!this.controlled ? <div className="response-controls">
                    <Button onClick={this.checkButton} title="Check" />
                </div> : ''}
            </div>
        );
    }

    constructor(_) {
        super(_);

        this.controlled = _.controlled;
    }
};