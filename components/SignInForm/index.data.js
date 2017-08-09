import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { dispatchers } from '../AuthFields/index.data';
import signInGql from './signinUser.gql';

function signinUserWrapper(AuthForm) {
  const signinUserWithData = graphql(signInGql, {
    props: ({ mutate }) => ({
      signinUser: ({ email, password }) =>
        mutate({
          variables: { email, password }
        })
    })
  })(AuthForm);

  const mapDispatchToProps = dispatch => ({
    signIn(token) {
      dispatch(dispatchers.signIn(token));
    }
  });

  const signinUserWithDataAndDispatch = connect(null, mapDispatchToProps)(
    signinUserWithData
  );

  return signinUserWithDataAndDispatch;
}

export default signinUserWrapper;
