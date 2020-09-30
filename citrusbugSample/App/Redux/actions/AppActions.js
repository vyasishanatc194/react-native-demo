import * as ActionType from './ActionTypes';


export const doSetLANG = text => {
  return dispatch => {
    dispatch({type: ActionType.SET_LANG_CODE, payload: text});
  };
};

export const doSetStoreName = text => {
  return dispatch => {
    dispatch({type: ActionType.SET_STORE_NAME, payload: text});
  }
}