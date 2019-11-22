import { reducer as oidcReducer } from 'redux-oidc';
import { combineReducers } from 'redux';

// Add your own reducers here.
const reducer = combineReducers(
  {
    oidc: oidcReducer
  }
);

export default reducer;
