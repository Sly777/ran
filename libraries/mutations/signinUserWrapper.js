import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import persist from '../persist';
import { signinAction } from '../../actions';

function signinUserWrapper(AuthForm) {
  const signinUserMutation = gql`
    mutation Signin($email: String!, $password: String!) {
      signinUser(email: { email: $email, password: $password }) {
        token
      }
    }
  `;

  const signinUserWithData = graphql(signinUserMutation, {
    props: ({ mutate }) => ({
      signinUser: ({ email, password }) =>
        mutate({
          variables: { email, password }
        })
    })
  })(AuthForm);

  const mapDispatchToProps = dispatch => ({
    signinUserDispatcher(token) {
      persist.willSetAccessToken(token);
      dispatch(signinAction(token));
    }
  });

  const signinUserWithDataAndDispatch = connect(null, mapDispatchToProps)(
    signinUserWithData
  );
  return signinUserWithDataAndDispatch;
}

export default signinUserWrapper;
