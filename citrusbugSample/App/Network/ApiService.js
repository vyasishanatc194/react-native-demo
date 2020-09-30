import {ApiUrl} from './ApiUrl';
import {getRequestWithHeader, postRequestWithBasicAuth, postRequestWithTokenRow} from './ApiRequest';

export const doLogin = async (body) => {
    try {
        const res = await postRequestWithBasicAuth(ApiUrl.token, body);
        return res;
    } catch(error) {
        throw error;
    }
}
export const doForgotPassword = async (token, body) => {
    try {
        const res = await postRequestWithTokenRow(ApiUrl.forgot_password, token, body);
        console.log('return coce',res )
        return res;
    } catch(error) {
        throw error;
    }
}

export const getAppToken = async (body) => {
    try {
        const res = await postRequestWithBasicAuth(ApiUrl.token, body);
        return res;
    } catch(error) {
        throw error;
    }
}

export const doUserSignUp = async (token, body) => {
    try {
        const res = await postRequestWithTokenRow(ApiUrl.user_regitration, token, body);
        return res;
    } catch(error) {
        throw error;
    }
}

export const getSubStore = async (token, storeId, page) => {
    try {
        const res = await getRequestWithHeader(
             `${ApiUrl.store}${storeId}/substores/`, token);
          

            return res;
    } catch(error) {
        throw error;
    }
}


export const getStoreDetails = async (token, storeId, page) => {
    try {
        const res = await getRequestWithHeader(
             `${ApiUrl.store}${storeId}/`, token);
          

            return res;
    } catch(error) {
        throw error;
    }
}