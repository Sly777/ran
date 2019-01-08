// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { Provider as ReduxProvider } from 'react-redux';

type Props = {
  client: Object,
  store: Object,
  ctx: Object,
  router: Object,
  Component: React.ComponentType<*>
};

const Render = (props: Props) => (
  <ApolloProvider client={props.client}>
    <ReduxProvider store={props.store}>
      <props.Component {...props} />
    </ReduxProvider>
  </ApolloProvider>
);

export default Render;

Render.propTypes = {
  client: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  ctx: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  Component: PropTypes.func.isRequired
};
