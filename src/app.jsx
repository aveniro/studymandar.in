import {h, createRef, render, Component} from 'preact';
import Router from 'preact-router';
import lazy from '@/lazy';

import(/* webpackChunkName: "firebase" */ '@/firebase');

const Home = lazy(import(/* webpackChunkName: "Home" */ '@/view/Home'));
const LoginRegister = lazy(import(/* webpackChunkName: "LoginRegister" */ '@/view/LoginRegister'));
const Welcome = lazy(import(/* webpackChunkName: "Welcome" */ '@/view/Welcome'));

import {Toaster} from '@/component/Toaster';
import Loader from '@/component/Loader';

import Prompt from '@/component/Prompt';

import {loadApi} from 'state/ui';

import '@/style/common.scss';

class App extends Component {
	contentBox = createRef();

	handleRoute = () => {
		console.log('routing');
		window.requestAnimationFrame(() => { 
			this.contentBox.current.classList.add('fade');
			setTimeout(() => {
				this.contentBox.current.classList.remove('fade');
			}, 300);
		 });
	};

	componentDidMount() {
		switch(window.location.pathname) {
			case '/welcome': {
				break;
			}

			default: {
				loadApi.start();
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
};

render(<App />, document.body);