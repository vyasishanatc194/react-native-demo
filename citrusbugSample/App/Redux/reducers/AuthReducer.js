import * as ActionType from '../actions/ActionTypes';

const initialState = {
    isLoginLoading: false,
    loginResponse: undefined,
    loginError: undefined,
    isForgotPasswordLoading: false,
    forgotPasswordResponse: undefined,
    forgotPasswordError: undefined,
    isSignupLoading: false,
    signupResponse: undefined,
    signupError: undefined
};

export default function AppReducer(state = initialState, action) {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST:
            return {
                ...state,
                isLoginLoading: true,
            };
        case ActionType.LOGIN_SUCCESS:
            return {
                ...state,
                isLoginLoading: false,
                loginResponse: action.payload
            };
        case ActionType.LOGIN_FAIL:
            return {
                ...state,
                isLoginLoading: false,
                loginError: action.payload
            };
        case ActionType.FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                isForgotPasswordLoading: true,
            };
        case ActionType.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isForgotPasswordLoading: false,
                forgotPasswordResponse: action.payload
            };
        case ActionType.FORGOT_PASSWORD_FAIL:
            return {
                ...state,
                isForgotPasswordLoading: false,
                forgotPasswordError: action.payload
            };
        case ActionType.SIGNUP_REQUEST:
            return {
                ...state,
                isSignupLoading: true,
            };
        case ActionType.SIGNUP_SUCCESS:
            return {
                ...state,
                isSignupLoading: false,
                signupResponse: action.payload
            };
        case ActionType.SIGNUP_FAIL:
            return {
                ...state,
                isSignupLoading: false,
                signupError: action.payload
            };
        default:
            return state;
    }
}
