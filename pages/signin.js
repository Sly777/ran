import withData from '../libraries/withData';
import AuthForm from '../containers/AuthForm';
import DefaultCon from '../containers/Default';

const SigninContainer = AuthForm.SigninContainer;

export default withData(props =>
  <DefaultCon title="Sign In" {...props}>
    <SigninContainer selectFields={'signinFields'} />
  </DefaultCon>
);
