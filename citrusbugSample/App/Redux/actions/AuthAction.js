import * as ActionType from './ActionTypes';

export const doLoginRequest = (data) => {
    return dispatch => {
        dispatch({ type: ActionType.LOGIN_REQUEST, payload: data });
    };
};

export const doLoginSuccess = (data) => {
    return dispatch => {
        dispatch({ type: ActionType.LOGIN_SUCCESS, payload: data });
    };
};

export const doLoginFail = (data) => {
    return dispatch => {
        dispatch({ type: ActionType.LOGIN_FAIL, payload: data });
    };
};

export const doForgotPasswordRequest = (data) => {
    return dispatch => {
        dispatch({ type: ActionType.FORGOT_PASSWORD_REQUEST, payload: data });
    };
};

export const doForgotPasswordSuccess = (data) => {
    return dispatch => {
        dispatch({ type: ActionType.FORGOT_PASSWORD_SUCCESS, payload: data });
    };
};

export const doForgotPasswordFail = (data) => {
    return dispatch => {
        dispatch({ type: ActionType.FORGOT_PASSWORD_FAIL, payload: data });
    };
};

export const doSignupRequest = (data) => {
    return dispatch => {
        dispatch({ type: ActionType.SIGNUP_REQUEST, payload: data });
    };
};

export const doSignupSuccess = (data) => {
    return dispatch => {
        dispatch({ type: ActionType.SIGNUP_SUCCESS, payload: data });
    };
};

export const doSignupFail = (data) => {
    return dispatch => {
        dispatch({ type: ActionType.SIGNUP_FAIL, payload: data });
    };
};