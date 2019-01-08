// @flow

import Redirect from '../redirect';

const graphQLErrorsHandler = (
  graphQLErrors: Array<Object>,
  operation: Function,
  forward: Function,
  ctx: Object // eslint-disable-line no-unused-vars
) => {
  // Map errors and perform actions to hadle errors (i.e Redirect)
  graphQLErrors.map(({ message, locations, path }) =>
    console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
    )
  );

  if (graphQLErrors) {
    Redirect(ctx, '/error-handling-page');
  }

  forward(operation);
};

export default graphQLErrorsHandler;
