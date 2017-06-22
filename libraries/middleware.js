import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';

export default function createMiddleware(clientMiddleware) {
  const middleware = applyMiddleware(clientMiddleware);
  const composeEnhancers = composeWithDevTools({ port: 8000 });

  return composeEnhancers(middleware);
}
