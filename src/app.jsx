import {h, render, Component} from 'preact';
import Router from 'preact-router';
import lazy from '@/lazy';

import(/* webpackChunkName: "firebase" */ '@/firebase');

const Home = lazy(import(/* webpackChunkName: "Home" */ '@/view/Home'));
const LoginRegister = lazy(import(/* webpackChunkName: "LoginRegister" */ '@/view/LoginRegister'));
const Welcome = lazy(import(/* webpackChunkName: "Welcome" */ '@/view/Welcome'));

import {Toaster} from '@/component/Toaster';
import Loader from '@/component/Loader';

import Prompt from '@/component/Prompt';

import '@/style/common.scss';

class App extends Component {
	state = {};

	render() {
	    return (
	        <div id="app">
	            <div className="content">
	                <Router>
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