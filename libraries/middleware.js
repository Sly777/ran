import { applyMiddleware, compose } from 'redux';

// TODO: had a hard time using remote-devtools
// import { composeWithDevTools } from 'remote-redux-devtools';
//
// export default function createMiddleware(clientMiddleware) {
//   const middleware = applyMiddleware(clientMiddleware);
//   const composeEnhancers = composeWithDevTools({});
//
//   return composeEnhancers(middleware);
// }

export default function createMiddleware(clientMiddleware) {
  const middleware = applyMiddleware(clientMiddleware);
  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  return composeEnhancers(middleware);
}
