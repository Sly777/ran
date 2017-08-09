import { graphql } from 'react-apollo';
import signInGql from './signinUser.gql';

export const withMutation = graphql(signInGql, {
  props: ({ mutate }) => ({
    mutations: {
      signInUser: ({ email, password }) =>
        mutate({
          variables: { email, password }
        })
    }
  })
});

export default withMutation;
