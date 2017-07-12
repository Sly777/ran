/* eslint-disable */
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import persist from '../libraries/persist';
import SignInForm from '../components/SignInForm';
import { signIn } from '../actions';

class SignInFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props
      .mutate({ variables: values })
      .then(response => {
        if (response) {
          this.props.signInDispatcher(response.data.signinUser.token);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return <SignInForm onSubmit={this.handleSubmit} />;
  }
}

const signInMutation = gql`
  mutation Signin($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

const SignInWithData = graphql(signInMutation)(SignInFormContainer);

const mapDispatchToProps = dispatch => ({
  signInDispatcher(token) {
    persist.willSetAccessToken(token);
    dispatch(signIn(token));
  }
});

const SignInWithDataAndState = connect(null, mapDispatchToProps)(
  SignInWithData
);

SignInFormContainer.propTypes = {
  mutate: PropTypes.func
}

export default SignInWithDataAndState;
