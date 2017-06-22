import { createStore } from 'redux';
import getReducer from './reducer';
import createMiddleware from './middleware';

let reduxStore = null;

export default (apolloClient, initialState) => {
  let store;
  if (!process.browser || !reduxStore) {
    const middleware = createMiddleware(apolloClient.middleware());
    store = createStore(getReducer(apolloClient), initialState, middleware);
    if (!process.browser) {
      return store;
    }
    reduxStore = store;
  }
  return reduxStore;
};
