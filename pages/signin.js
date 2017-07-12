import { Helmet } from 'react-helmet';
import App from '../components/App';
import Header from '../containers/Header';
import SignInFormContainer from '../containers/SignInFormContainer';
import withData from '../libraries/withData';

export default withData(props =>
  <App>
    <Helmet>
      <title>SignIn :: RAN! Example</title>
    </Helmet>
    <Header pathname={props.url.pathname} />
    <SignInFormContainer />
  </App>
);
