import { createStore } from 'redux';
import { dispatchers } from '../components/AuthFields/store';
import getReducer from './reducer';
import createMiddleware from './middleware';
import persist from './persist';

let reduxStore = null;

export default (apolloClient, initialState, token) => {
  let store;
  if (!process.browser || !reduxStore) {
    const middleware = createMiddleware(apolloClient.middleware());
    store = createStore(getReducer(apolloClient), initialState, middleware);

    let tokenInStore = store.getState().auth.token;

    if (!tokenInStore) {
      (async () => {
        tokenInStore =
          token || (await Promise.resolve(persist.willGetAccessToken()));

        if (typeof token === 'string' && !token.includes('Error')) {
          if (token.length) {
            store.dispatch(dispatchers.signIn(token));
          } else {
            store.dispatch(dispatchers.signOut());
          }
        } else {
          store.dispatch(dispatchers.signOut());
        }
      })();
    }

    if (!process.browser) {
      return store;
    }

    reduxStore = store;
  }
  return reduxStore;
};
