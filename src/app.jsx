import {h, render, Component} from 'preact';
import Router from 'preact-router';

import '@/firebase';

import Home from '@/view/Home';
import Login from '@/view/Login';
import Welcome from '@/view/Welcome';

import {Toaster, toast} from '@/component/Toaster';
import Loader from '@/component/Loader';

import TopBar from '@/component/TopBar';

import Prompt from '@/component/Prompt';

import '@/style/common.scss';

class App extends Component {
	state = {};

	render({}, {}) {
		return (
			<div id="app">
				<TopBar />
				
				<div className="content">
					<Router>
						<Home path="/" />
						<Login path="/login" />
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