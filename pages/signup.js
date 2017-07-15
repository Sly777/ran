import AuthForm from '../containers/AuthForm';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';

const SignupContainer = AuthForm.SignupContainer;

export default withData(props =>
  <DefaultCon title="Sign Up" {...props}>
    <SignupContainer selectFields={'signupFields'} />
  </DefaultCon>
);
