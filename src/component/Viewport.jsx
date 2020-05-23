import {Component, h} from 'preact';

import Tube from '@/tube';
import Prompt from '@/component/Prompt';

import '#/component/Viewport.scss';

export default class Viewport extends Component {
    state = {tube: new Tube()};

    push = view => {
        this.setState({tube: this.state.tube.add(view)});
    };

    goBack = () => {
        if(this.state.tube.front()?.props.confirmLeave) {
            Prompt.yesNo('leave this page').then(res => {
                if(res) {
                    this.setState({tube: this.state.tube.drop()});
                }
            });
        } else {
            this.setState({tube: this.state.tube.drop()});
        }
    };

    set = view => {
        this.setState({tube: this.state.tube.dump().add(view)});
    };

    render(_, {tube}) {
        return (
            <div className="viewport">
                <div data-status={tube.size() > 1 ? 'enabled' : 'disabled'} className="navigation">
                    {tube.size() > 1 ? 
                        <div onClick={this.goBack} className="back-button">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                            </svg>
                        </div> 
                    : ''}
                </div>
                <div className="view-item">
                    { tube.front() || _.base }
                </div>
            </div>
        );
    }
}