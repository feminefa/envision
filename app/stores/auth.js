import { createStore } from 'redux'
import {
    navigate,
} from 'react-navigation';
export const AUTH_STATES = {
    LOGIN: 'auth.login',
    LOGIN_SUCCESS: 'auth.login.success',
    LOGIN_FAILURE: 'auth.login.failure',
    REGISTER: 'auth.register',
    FORGOT_PASSWORD: 'auth.forgot',
    RESET: 'auth.reset',
    NAVIGATION: 'auth.navigation',
    LOGOUT: 'auth.logout'
}
export const authReducer = (state = {_user: null, user: {}, navigator: {}, dispatch: {}}, action) => {
    switch (action.type) {
        case AUTH_STATES.LOGIN:
        case AUTH_STATES.LOGIN_SUCCESS:
        case AUTH_STATES.LOGIN_FAILURE:
             console.log('feminefa', 'login success', action.user)
            return Object.assign({}, state, action);
        case AUTH_STATES.NAVIGATION:
            return Object.assign({}, state, action);
        case 'RESET':
            return {};
        default:
            obj = Object.assign({}, state, { ...action });

            return obj;
    }
}


//let store = createStore(authStore);

