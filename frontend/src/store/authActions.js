import axios from 'axios'

// Declare known actions
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (token, refreshToken, userId, email, displayName) => {
    return {
        type: AUTH_SUCCESS,
        token: token,
        refreshToken: refreshToken,
        userId: userId,
        email: email,
        displayName: displayName
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT
    };
};

// Temporary call the go backend to login
export const doAuth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        // Simply insure we can reach the API server
        // It performs a dummy check on its side for the time being
        axios.post('/auth/login', authData).then(
            response => {
                let mt = response.data.token
                console.log('Auth success', response.data);
                dispatch(updateLocalStorage(mt.token, mt.refreshToken, mt.userId, mt.displayName, mt.expiresIn))
                dispatch(registerAuthTimeout(mt.refreshToken, mt.expiresIn));
                dispatch(authSuccess(mt.token, mt.refreshToken, mt.userId, mt.email, mt.displayName));
            }
        ).catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        });
    };
};


export const updateLocalStorage = (token, refreshToken, userId, displayName, expiresIn) => {
    return dispatch => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId);
        localStorage.setItem('displayName', displayName);
        const expirationDate = new Date(new Date().getTime() + (expiresIn - 30) * 1000);
        localStorage.setItem('expirationDate', expirationDate);
    };
};

export const registerAuthTimeout = (refreshToken, email, expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            console.log('Token about to expire...')
            // dispatch(refreshToken((expirationTime - 500) * 1000, email));
        }, 10 * 1000);
    };
};
