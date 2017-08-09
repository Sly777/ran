import SignInForm from '../containers/SignInForm';
import withData from '../libraries/withData';
import DefaultCon from '../layouts/Default';

export default withData(props =>
  <DefaultCon title="Sign In" {...props}>
    <SignInForm />
  </DefaultCon>
);
