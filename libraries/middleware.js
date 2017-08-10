import { applyMiddleware, compose } from 'redux';

export default function createMiddleware(clientMiddleware) {
  const middleware = applyMiddleware(clientMiddleware);
  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  return composeEnhancers(middleware);
}
