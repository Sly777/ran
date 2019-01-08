// @flow

import Redirect from '../redirect';

const netwotkErrorsHandler = (
  networkError: Object,
  operation: Object,
  forward: Function,
  ctx: Object
) => {
  // Perform actions to hadle errors (i.e Redirect)
  console.log(networkError.statusCode);
  switch (networkError.statusCode) {
    case 400:
    case 401:
      Redirect(ctx, '/login');
      break;
    default:
      forward(operation);
  }
};

export default netwotkErrorsHandler;
