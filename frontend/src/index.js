import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from "./store/authReducer";

// Enable Redux devtool in dev mode (chrome only)
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const store = createStore(authReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

