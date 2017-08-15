import SignUpForm from '../components/SignUpForm';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';
import GaWrapper from '../libraries/googleAnalytics';

export default GaWrapper(
  withData(props =>
    <DefaultCon title="Sign Up" {...props}>
      <SignUpForm />
    </DefaultCon>
  )
);
