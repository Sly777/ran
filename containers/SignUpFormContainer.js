/* eslint-disable */
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import persist from '../libraries/persist';
import SignUpForm from '../components/SignUpForm';
import { signIn } from '../actions';

class SignUpFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props
      .Create(values)
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
    return <SignUpForm onSubmit={this.handleSubmit} />;
  }
}

const signUpMutation = gql`
  mutation Create(
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

const SignUpWithData = graphql(signUpMutation, {
  props: ({ mutate }) => ({
    Create: ({ firstName, lastName, email, password }) =>
      mutate({
        variables: { firstName, lastName, email, password }
      })
  })
})(SignUpFormContainer);

const mapDispatchToProps = dispatch => ({
  signInDispatcher(token) {
    persist.willSetAccessToken(token);
    dispatch(signIn(token));
  }
});

const SignUpWithDataAndDispatch = connect(null, mapDispatchToProps)(
  SignUpWithData
);

SignUpFormContainer.propTypes = {
  Create: PropTypes.func,
  signInDispatcher: PropTypes.func.isRequired
};

export default SignUpWithDataAndDispatch;
