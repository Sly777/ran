import SignInFormContainer from '../containers/SignInFormContainer';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';

export default withData(props =>
  <DefaultCon title="Sign In" {...props}>
    <SignInFormContainer />
  </DefaultCon>
);
