// @flow
import * as React from 'react';
import { getDataFromTree } from 'react-apollo';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';
import cookies from 'next-cookies';
import apolloClient from '../ApolloClient';
import reduxStore from '../reduxStore';
import persist from '../persist';

import Renderer from './Render';

type Props = {
  headers: HeadersType,
  accessToken: ?string,
  router: Object,
  apolloState: Object,
  reduxState: Object
};

type Context = {
  pathname: string,
  query: Object,
  asPath: string,
  req?: {
    headers?: Object
  },
  res?: Object,
  jsonPageRes?: Object,
  err?: Object
};

export default (
  Component: React.ComponentType<*>
): React.ComponentType<Props> =>
  class extends React.Component<Props> {
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
      reduxState: PropTypes.object.isRequired,
      headers: PropTypes.object.isRequired,
      accessToken: PropTypes.string
    };

    static defaultProps = {
      accessToken: null
    };

    constructor(props: Props) {
      super(props);
      this.apolloClient = apolloClient({}, '', this.props.apolloState, {});
      this.reduxStore = reduxStore(this.props.reduxState);
    }

    static async getInitialProps(ctx: Context) {
      let apolloState = {};
      let serverState = {};

      const headers = ctx.req ? ctx.req.headers : {};
      const token: string = cookies(ctx)[persist.ACCESS_TOKEN_KEY];

      const props = {
        router: {
          url: { query: ctx.query, pathname: ctx.pathname }
        },
        ...(await (typeof Component.getInitialProps === 'function'
          ? Component.getInitialProps(ctx)
          : {}))
      };

      if (!process.browser) {
        const client = apolloClient(headers || {}, token || '', {}, ctx);
        const store = reduxStore();

        const app = (
          <Renderer
            client={client}
            store={store}
            ctx={ctx || {}}
            router={props.router}
            Component={Component}
          />
        );

        await getDataFromTree(app);

        apolloState = client.cache.extract();
        serverState = store.getState();
      }

      return {
        reduxState: serverState,
        apolloState,
        headers,
        ...props
      };
    }

    apolloClient: Object;

    reduxStore: Object;

    render() {
      return (
        <Renderer
          client={this.apolloClient}
          store={this.reduxStore}
          ctx={{}}
          router={this.props.router}
          Component={Component}
        />
      );
    }
  };
