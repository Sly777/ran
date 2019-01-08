import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-client-preset';
import { onError } from 'apollo-link-error';

import graphQLErrorsHandler from './graphqlErrorsHandler';
import netwotkErrorsHandler from './networkErrorsHandler';
import persist from '../persist';

let apolloClient = null;

const httpLink = createHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cj7ke77fv0e9i0122pflagbvx',
  credentials: 'include'
});

function createClient(headers, token, initialState, ctx) {
  let accessToken = token;

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        graphQLErrorsHandler(graphQLErrors, operation, forward, ctx);
      }

      if (networkError) {
        netwotkErrorsHandler(networkError, operation, forward, ctx);
      }
    }
  );

  (async () => {
    // eslint-disable-next-line no-param-reassign
    accessToken = token || (await persist.willGetAccessToken());
  })();

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: accessToken
      }
    });
    return forward(operation);
  })
    .concat(errorLink)
    .concat(httpLink);

  return new ApolloClient({
    headers,
    link: authLink,
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default (headers, token, initialState, ctx) => {
  if (!process.browser) {
    return createClient(headers, token, initialState, ctx);
  }
  if (!apolloClient) {
    apolloClient = createClient(headers, token, initialState, ctx);
  }
  return apolloClient;
};
