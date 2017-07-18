import withData from '../libraries/withData';
import SignInForm from '../components/SignInForm';
import DefaultCon from '../containers/Default';

export default withData(props =>
  <DefaultCon title="Sign In" {...props}>
    <SignInForm />
  </DefaultCon>
);
