/* eslint-disable */
if (env.NODE_ENV === 'development') {
    console.log('Hotloading enabled!');
    // Inject react-hot-loader
    const runtime = require('react-refresh/runtime');
    runtime.injectIntoGlobalHook(window);
    
    if (module.hot) {
        module.hot.accept();
    }

    // See https://github.com/facebook/react/issues/16604#issuecomment-528663101
    window.$RefreshReg$ = () => {};
    window.$RefreshSig$ = () => type => type;
}

require('./app.jsx');