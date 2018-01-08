// @flow
import * as React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';
import cookies from 'next-cookies';
import apolloClient from './apolloClient';
import reduxStore from './reduxStore';
import persist from './persist';

type Props = {
  headers: HeadersType,
  accessToken: ?string,
  initialState: Object,
  url: UrlType
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
      headers: PropTypes.object.isRequired,
      accessToken: PropTypes.string,
      initialState: PropTypes.object.isRequired
    };

    static defaultProps = {
      accessToken: null
    };

    static async getInitialProps(ctx: Context) {
      const headers = ctx.req ? ctx.req.headers : {};
      const token: string = cookies(ctx)[persist.ACCESS_TOKEN_KEY];

      const client = apolloClient(headers, token);
      const store = reduxStore(client, client.initialState, token);
      const props = {
        url: { query: ctx.query, pathname: ctx.pathname },
        ...(await (typeof Component.getInitialProps === 'function'
          ? Component.getInitialProps(ctx)
          : {}))
      };

      if (!process.browser) {
        const app = (
          <ApolloProvider client={client} store={store}>
            <Component {...props} />
          </ApolloProvider>
        );
        await getDataFromTree(app);
      }

      const state = store.getState();
      return {
        initialState: {
          ...state,
          apollo: {
            data: state.apollo.data
          }
        },
        headers,
        ...props
      };
    }

    constructor(props: Props) {
      super(props);

      this.apolloClient = apolloClient(this.props.headers);
      this.reduxStore = reduxStore(this.apolloClient, this.props.initialState);
    }

    apolloClient: Object;
    reduxStore: Object;

    render() {
      return (
        <ApolloProvider client={this.apolloClient} store={this.reduxStore}>
          <Component {...this.props} />
        </ApolloProvider>
      );
    }
  };
