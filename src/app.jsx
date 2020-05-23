import {h, createRef, render, Component} from 'preact';
import Router                            from 'preact-router';
import lazy                              from '@/lazy';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '@/view/Home'));
const LoginRegister = lazy(() => import(/* webpackChunkName: "LoginRegister" */ '@/view/LoginRegister'));
const Welcome = lazy(() => import(/* webpackChunkName: "Welcome" */ '@/view/Welcome'));

import {Toaster} from '@/component/Toaster';
import Loader    from '@/component/Loader';

import Prompt from '@/component/Prompt';

import {loadApi}   from 'state/ui';
import {userState} from 'state/user';

import '@/style/common.scss';

class App extends Component {
    contentBox = createRef();

    handleRoute = () => {
        window.requestAnimationFrame(() => { 
            this.contentBox.current?.classList.add('fade');
            setTimeout(() => {
                this.contentBox.current?.classList.remove('fade');
            }, 300);
        });
    };

    componentDidMount() {
        import(/* webpackChunkName: "firebase" */ '@/firebase');

        switch(window.location.pathname) {
        case '/welcome': {
            break;
        }

        default: {
            if(!userState.getState()) loadApi.start();
            break;
        }
        }
    }

    render() {
        return (
            <div id="app">
                <div ref={this.contentBox} className="content">
                    <Router onChange={this.handleRoute}>
                        <Home path="/" />
                        <LoginRegister path="/start" />
                        <Welcome path="/welcome" />
                    </Router>
                </div>

                <Prompt />
                <Toaster />
                <Loader />
            </div>
        );
    }
}

render(<App />, document.body);