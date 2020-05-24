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
    responseEl = createRef();

    // Hints
    responseTitle = 'Response';
    responseHint = 'Response Hint';

    state = {
        question: null,
        answer: null,
        status: 'nominal',
        multipleChoiceOptions: []
    };

    checkButton = () => {

    };

    /**
     * Check the current answer inside of the PracticeModality controlled input field
     * and call onCorrect() or onIncorrect appropriately
     */
    check = () => {
        if(this.responseEl.current?.value() === this.state.answer) {
            this.onCorrect();
        } else {
            this.onIncorrect();
        }
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
        this.responseEl.current?.clear();
        this.responseEl.current?.focus();
        this.responseEl.current?.enable();
        this.setState({status: 'nominal', ...this.getQuestion()});
    }

    onCorrect() {
        this.props.onCorrect?.();
        this.setState({status: 'correct'});
    }

    onIncorrect() {
        this.props.onIncorrect?.(this.state.answer);
        this.responseEl.current?.disable();
        this.setState({status: 'incorrect'});
    }

    componentDidMount() {
        if(!this.controlled) {
            document.addEventListener('keydown', this.onKeydown);
        }

        this.responseEl.current?.focus();

        this.next();
    }

    componentWillUnmount() {
        if(!this.controlled) {
            document.removeEventListener('keydown', this.onKeydown);
        }
    }

    render(_, {question, status, answer}) {
        console.log(this.state);

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
                        <TextInput status={status === 'incorrect' ? 'errored' : null} ref={this.responseEl} title={this.responseTitle} hint={this.responseHint} />
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
                <div className="response-area">
                    {responseEl}
                    <div data-status={status} className="correction-area">
                        The correct answer is <span>{answer}</span>.
                    </div>
                </div>
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