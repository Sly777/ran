import SignUpForm from '../containers/SignUpForm';
import withData from '../libraries/withData';
import DefaultCon from '../layouts/Default';

export default withData(props =>
  <DefaultCon title="Sign Up" {...props}>
    <SignUpForm />
  </DefaultCon>
);
