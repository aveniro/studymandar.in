import {h, Component} from 'preact';

export default function lazy(importFunc, options) {
    return class LazyComponent extends Component {
        state = {component: options?.loading || null};

        static _importPromise = null;

        static load() {
            if(!LazyComponent._importPromise) LazyComponent._importPromise = importFunc();
        }

        componentDidMount() {
            LazyComponent.load();

            LazyComponent._importPromise.then(({default: component}) => { 
                this.setState({component: h(component, this.props, this.props.children)}); 
                options?.preload?.load();
            });
        }

        render(_, {component}) {
            return component;
        }
    };
}