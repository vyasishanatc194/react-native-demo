import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import index from '../reducers';
const middlewares = [];
middlewares.push(thunk);
middlewares.push(logger);
export default function configureStore() {
  const store = compose(applyMiddleware(...middlewares))(createStore)(index);

  return store;
}
