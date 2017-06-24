import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';

export default function createMiddleware(clientMiddleware) {
  const middleware = applyMiddleware(clientMiddleware);
  const composeEnhancers = composeWithDevTools({});

  return composeEnhancers(middleware);
}
