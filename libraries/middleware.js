import { applyMiddleware, compose } from 'redux';

export default function createMiddleware(clientMiddleware) {
  const middleware = applyMiddleware(clientMiddleware);
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  return composeEnhancers(middleware);
}
