import {h, Component} from 'preact';

export default function lazy(importPromise, loading = null) {
    return class LazyComponent extends Component {
        state = {component: loading};

        componentDidMount() {
            importPromise().then(({default: component}) => { this.setState({component: h(component, this.props, this.props.children)}); });
        }

        render(_, {component}) {
            return component;
        }
    };
}