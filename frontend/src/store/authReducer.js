import {AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT} from './authActions';

const initialState = {
    token: null,
    refreshToken: null,
    userId: null,
    email: 'anon@example.com',
    displayName: 'Anonymous',
    loading: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START: return authStart(state, action);
        case AUTH_SUCCESS: return authSuccess(state, action);
        case AUTH_FAIL: return authFail(state, action);
        case AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
};

export default authReducer;

const authStart = (state, action) => {
    return updateObject(state, { loading: true, error: null });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        refreshToken: action.refreshToken,
        userId: action.userId,
        email: action.email,
        displayName: action.displayName,
        loading: false,
        error: null
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        email: 'anonymous',
        displayName: 'anonymous',
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        refreshToken: null,
        userId: null,
        email: 'anon@example.com',
        displayName: 'Anonymous',
    });
};

// Helpers 
const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};


