import {h, Component} from 'preact';

import '#/ui/Button.scss';

export default class Button extends Component {
    state = {};

    render(_) {
        return (
            <div onClick={_.onClick} className="button">
                { _.title }
            </div>
        );
    }
}