import { createStore } from 'redux';
import getReducer from './reducer';
import createMiddleware from './middleware';
import persist from './persist';
import { dispatchers } from '../components/AuthFields/index.data';

let reduxStore = null;

export default (apolloClient, initialState) => {
  let store;
  if (!process.browser || !reduxStore) {
    const middleware = createMiddleware(apolloClient.middleware());
    store = createStore(getReducer(apolloClient), initialState, middleware);

    (async () => {
      const token = await Promise.resolve(persist.willGetAccessToken());
      if (token) {
        dispatchers.signIn(token);
      } else if (!token) {
        dispatchers.signOut();
      }
    })();

    if (!process.browser) {
      return store;
    }

    reduxStore = store;
  }
  return reduxStore;
};
