import {Component, Fragment, createRef, h} from 'preact';
import {route} from 'preact-router';

import Button from '@/ui/Button';

import '#/view/Welcome.scss';

export default class Welcome extends Component {
    welcomePageRef = createRef();
    state = {
        page: 1,
        touching: false,
        startX: 0,
        displacement: 0
    };

    pages = [
        {i: 1, title: 'chinese-helper', body: 'Welcome to the free chinese helper software created by Nathan Seymour.', color: '#3891A6'},
        {i: 2, title: 'The Philosophy', body: 'The most efficient and successful language learners create their own resources, we give you the tools to do just that.', color: '#8F3985'},
        {i: 3, title: 'Mobility', body: 'Cloud based and mobile optimized, you can take your study session with you anywhere.', color: '#2F3061'},
        {
            i: 4, 
            title: 'chinese-helper', 
            body: 'Well, what are you waiting for?', 
            color: '#FF595E',
            action: {
                title: 'Get Started',
                action: () => {
                    route('/register');
                }
            }
        }
    ];

    pageNext = () => {
        if(this.state.page + 1 < this.pages.length + 1) {
            setTimeout(() => {
                this.setState({page: this.state.page + 1});
            }, 20);
        }
    };

    pageBack = () => {
        if(this.state.page - 1 > 0) {
            this.setState({page: this.state.page - 1});
        }
    };

    touchStart = e => {
        e.preventDefault();
        this.setState({touching: true, startX: e.touches[0].pageX, displacement: 0});
    };

    touchEnd = () => {
        this.setState({touching: false});
        const slipThreshold = 75;
        if(this.state.displacement < -slipThreshold) {
            this.pageNext();
        } else if(this.state.displacement > slipThreshold) {
            this.pageBack();
        }
    };

    touchCancel = () => {
        console.log('cancel');
        this.setState({touching: false});
    };

    touchMove = e => {
        if(Math.abs(e.touches[0].pageX - this.state.startX) > 0) {
            this.setState({displacement: e.touches[0].pageX - this.state.startX});
        }
    };

    render(_, {touching, displacement}) {
        return (
            <Fragment>
                <div onTouchStart={this.touchStart}
                    onTouchEnd={this.touchEnd}
                    onTouchCancel={this.touchCancel}
                    onTouchMove={this.touchMove}
                    ref={this.welcomePageRef} 
                    className="welcome"
                    data-status={touching ? 'touching' : 'not-touching'}
                    style={{ transform: touching ? `translateX(calc(-${String(this.state.page)} * 100vw + calc(${displacement}px * 1.2)))` : `translateX(calc(-${String(this.state.page)} * 100vw))` }}>
                    <div className="welcome-page padding" style={{background: this.pages[0].color}}></div>
                    {this.pages.map(page => 
                        <div key={page.i} style={{background: page.color}} className="welcome-page">
                            <div className="page-title">{page.title}</div>
                            <div className="page-body">{page.body}</div>
                            { page.action ? <div className="page-action">
                                <Button onClick={page.action.action} title={page.action.title} />
                            </div> : ''}
                        </div>
                    )}
                    <div className="welcome-page padding" style={{background: this.pages[this.pages.length - 1].color}}></div>
                </div>

                <div className="welcome-side-navigation">
                    <svg onClick={this.pageBack} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                    <svg onClick={this.pageNext} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                </div>

                <div className="welcome-navigation">
                    {this.pages.map(page => 
                        <svg key={page.i} data-status={page.i === this.state.page ? 'active' : 'inactive'} viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50"/>
                        </svg>
                    )}
                </div>
            </Fragment>
        );
    }
}