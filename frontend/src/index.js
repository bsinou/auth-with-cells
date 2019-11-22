import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';

import store from './store/store';
import userManager from './store/userManager';

import App from './components/App';

// Default styling from React
import './index.css';

// register the OidcProvider nested below react-redux's Provider
const app = (
    <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
            <App />
        </OidcProvider>
    </Provider>
)

ReactDOM.render(app, document.getElementById('app'));
