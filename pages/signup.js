import SignUpFormContainer from '../containers/SignUpFormContainer';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';

export default withData(props =>
  <DefaultCon title="Sign Up" {...props}>
    <SignUpFormContainer />
  </DefaultCon>
);
