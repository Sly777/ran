import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { dispatchers } from '../AuthFields/store';
import signInGql from './signinUser.gql';

const withMutation = graphql(signInGql, {
  props: ({ mutate }) => ({
    mutations: {
      signInUser: ({ email, password }) =>
        mutate({
          variables: { email, password }
        })
    }
  })
});

const mapDispatchToProps = dispatch => ({
  actions: {
    signInUser(token) {
      dispatch(dispatchers.signIn(token));
    }
  }
});

export default comp => {
  const compWithApollo = withMutation(comp);
  return connect(null, mapDispatchToProps)(compWithApollo);
};
