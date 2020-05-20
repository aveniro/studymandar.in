import {Component, createRef, h} from 'preact';
import Prompt from '@/component/Prompt';

import TextInput from '@/ui/TextInput';
import Button from '@/ui/Button';

import regex from '@/regex';

import '#/component/WordEdit.scss';

export default class WordEdit extends Component {
    scriptRef = createRef();
    pinyinRef = createRef();
    translationRef = createRef();

    submitValue = () => {
        return {
            ...(this.props.template || {}),
            script: this.scriptRef.current.value(),
            pinyin: this.pinyinRef.current.value(),
            translation: this.translationRef.current.value()
        };
    };

    submit = () => {
        this.props.onSubmit?.(this.submitValue());

        this.scriptRef.current.clear();
        this.pinyinRef.current.clear();
        this.translationRef.current.clear();

        this.scriptRef.current.focus();
    };

    keydown = e => {
        if(e.key === 'Enter') {
            if(this.scriptRef.current.value() !== ''
            && this.pinyinRef.current.value() !== ''
            && this.translationRef.current.value() !== '') {
                this.submit();
            }
        }
    };
    
    confirmDelete = () => {
        Prompt.yesNo(`delete ${this.scriptRef.current.value()}`).then(response => {
            response && this.props.onWordDelete?.(this.submitValue());
        });
        
    };

    componentDidMount() {
        document.addEventListener('keydown', this.keydown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydown);
    }

    render(_) {
        return (
            <div className="word-edit">
                <div className="word-information">
                    <TextInput ref={this.scriptRef} start={_.template?.script} regex={regex.chineseScript} hint="中文" title="Chinese Script" />
                    <TextInput ref={this.pinyinRef} start={_.template?.pinyin} regex={regex.pinyin} hint="zhong1 wen2" title="Pinyin" />
                    <TextInput ref={this.translationRef} start={_.template?.translation} regex={regex.translation} hint="chinese language" title="Translation" />

                    <Button onClick={this.submit} title="Save Word" />
                </div>
                {_.template ? <div className="word-extra-information">
                    <div className="word-extra-title">Word Information</div>
                    <Button onClick={this.confirmDelete} title="Delete Word" />
                </div> : ''}
            </div>
        );
    }
}