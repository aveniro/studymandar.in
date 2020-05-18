import {createRef, h, Component} from 'preact';

import '#/ui/TextInput.scss';

export default class TextInput extends Component {
    state = { status: 'normal' };

    textBoxRef = createRef();

    value = () => {
        return this.textBoxRef.current?.value;
    };

    setValue = value => {
        if(this.textBoxRef.current) {
            this.textBoxRef.current.value = value;
        }
    };

    clear = () => {
        this.textBoxRef.current.value = '';
    };

    focus = () => {
        this.textBoxRef.current.focus();
    };

    onInput = () => {
        if(this.props.regex) {
            this.setState({ 
                status: this.textBoxRef.current.value.match(this.props.regex) ? 'normal' : 'errored'
            });
        }
    };

    componentDidMount() {
        if(this.props.start) this.setValue(this.props.start);
    }

    render(_, { status }) {
        return (
            <div data-status={status} className="text-input">
                <div className="text-input-title"> { _.title } </div>
                <input ref={this.textBoxRef} onChange={this.onInput} onInput={this.onInput} placeholder={ _.hint } type={_.secure ? 'password' : 'text'}/>
            </div>
        );
    }
}