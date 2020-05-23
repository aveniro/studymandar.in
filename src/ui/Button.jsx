import {Component, h} from 'preact';

import '#/ui/Button.scss';

export default class Button extends Component {
    state = {};

    render(_) {
        return (
            <div data-status={_.loading ? 'loading' : 'not-loading'} onClick={_.onClick} className="button">
                <span className="button-title">{ _.title }</span>
                <svg width="50" height="50" viewBox="0 0 50 50">
                    <path fill="#FFFFFF" d="M25,5A20.14,20.14,0,0,1,45,22.88a2.51,2.51,0,0,0,2.49,2.26h0A2.52,2.52,0,0,0,50,22.33a25.14,25.14,0,0,0-50,0,2.52,2.52,0,0,0,2.5,2.81h0A2.51,2.51,0,0,0,5,22.88,20.14,20.14,0,0,1,25,5Z"></path>
                </svg>
            </div>
        );
    }
}