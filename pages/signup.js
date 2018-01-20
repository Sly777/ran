// @flow
import * as React from 'react';
import SignUpForm from '../components/SignUpForm';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';

export default withData(props => (
  <DefaultCon title="Sign Up" {...props}>
    <SignUpForm />
  </DefaultCon>
));
