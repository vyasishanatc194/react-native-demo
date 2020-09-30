import * as ActionType from '../actions/ActionTypes';

const initialState = {
  lang: undefined,
  storeName: undefined
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.SET_LANG_CODE:
      return {
        ...state,
        lang: action.payload,
      };
      case ActionType.SET_STORE_NAME:
        return {
          ...state,
          storeName: action.payload,
        };
    default:
      return state;
  }
}
