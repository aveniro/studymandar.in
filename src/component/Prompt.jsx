import {Component, h} from 'preact';

import Button from '@/ui/Button';

import '#/component/Prompt.scss';

export default class Prompt extends Component {
    static _instance = null;

    state = {
        visible: false,
        promptText: '',
        actions: []
    };

    resolve = final => {
        this.setState({
            visible: false,
            promptText: '',
            actions: []
        });

        final?.();
    };

    render(_, {visible, promptText, actions}) {
        return visible ? (
            <div className="prompt-body">
                <div className="prompt">
                    <div className="prompt-title">{promptText}</div>
                    {actions.map(action => 
                        <Button key={action.title} title={action.title} onClick={() => { this.resolve(action.callback); }} />
                    )}
                </div>
            </div>
        ) : null;
    }

    static yesNo(promptText) {
        return new Promise(resolve => {
            Prompt.get()?.setState({
                visible: true,
                promptText: `Do you want to ${promptText}?`,
                actions: [
                    {title: 'Yes', callback: () => { resolve(true); }},
                    {title: 'No', callback: () => { resolve(false); }}
                ]
            });
        });
    }

    static get() {
        if(!Prompt._instance) {
            Prompt._instance = new Prompt();
        }

        return Prompt._instance;
    }

    constructor() {
        super();
        Prompt._instance = this;
    }
}