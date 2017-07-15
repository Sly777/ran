import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import persist from '../persist';
import { signinAction } from './authActions';

function createUserWrapper(AuthForm) {
  const createUserMutation = gql`
    mutation createUser(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
    ) {
      createUser(
        firstName: $firstName
        lastName: $lastName
        authProvider: { email: { email: $email, password: $password } }
      ) {
        id
      }
      signinUser(email: { email: $email, password: $password }) {
        token
      }
    }
  `;

  const createUserWithData = graphql(createUserMutation, {
    props: ({ mutate }) => ({
      createUser: ({ firstName, lastName, email, password }) =>
        mutate({
          variables: { firstName, lastName, email, password }
        })
    })
  })(AuthForm);

  const mapDispatchToProps = dispatch => ({
    signinDispatcher(token) {
      persist.willSetAccessToken(token);
      dispatch(signinAction(token));
    }
  });

  const createUserWithDataAndDispatch = connect(null, mapDispatchToProps)(
    createUserWithData
  );
  return createUserWithDataAndDispatch;
}

export default createUserWrapper;
