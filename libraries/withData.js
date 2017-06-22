import { ApolloProvider, getDataFromTree } from 'react-apollo';
import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';
import apolloClient from './apolloClient';
import reduxStore from './reduxStore';

export default Component =>
  class extends React.Component {
    static propTypes = () => ({
      headers: PropTypes.object.isRequired,
      accessToken: PropTypes.string,
      initialState: PropTypes.object.isRequired
    });

    static async getInitialProps(ctx) {
      const headers = ctx.req ? ctx.req.headers : {};
      const client = apolloClient(headers);
      const store = reduxStore(client, client.initialState);

      const props = {
        url: { query: ctx.query, pathname: ctx.pathname },
        ...(await (Component.getInitialProps
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

    constructor(props) {
      super(props);

      this.apolloClient = apolloClient(this.props.headers);
      this.reduxStore = reduxStore(this.apolloClient, this.props.initialState);
    }

    render() {
      return (
        <ApolloProvider client={this.apolloClient} store={this.reduxStore}>
          <Component {...this.props} />
        </ApolloProvider>
      );
    }
  };
