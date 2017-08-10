import SignInForm from '../containers/SignInForm';
import withData from '../libraries/withData';
import Layout from '../containers/Layout';

export default withData(props =>
  <Layout title="Sign In" {...props}>
    <SignInForm />
  </Layout>
);
