import { createStore, applyMiddleware, compose } from "redux";
import { loadUser } from "redux-oidc";
import thunk from 'redux-thunk';
import createOidcMiddleware from 'redux-oidc';

import reducer from "./reducer";
import userManager from "./userManager";

/** DUMMY MIDDLEWARES */
// Random custom function
const shouldValidate = (state, action) => {
    return !action.type === 'DONT_VALIDATE';
}

// A dummy logger
const loggerMiddleware = store => next => action => {
    console.log("Action type:", action.type);
    console.log("Action payload:", action.payload);
    console.log("State before:", store.getState());
    next(action);
    console.log("State after:", store.getState());
};

// Enable Redux devtool in dev mode
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// create the middleware
const oidcMiddleware = createOidcMiddleware(userManager, loggerMiddleware, shouldValidate);

// configure your redux store
const store = createStore(reducer, composeEnhancers(applyMiddleware(oidcMiddleware, thunk)));

export default store;

// Will try to reconnect when browsing back to this SPA.
loadUser(store, userManager);


