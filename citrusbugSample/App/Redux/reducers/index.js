import {combineReducers} from 'redux';
import AppReducer from './AppReducer';
import AuthReducer from './AuthReducer';

const index = combineReducers({
  App: AppReducer,
  Auth: AuthReducer
});

export default index;
