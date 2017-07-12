import { Helmet } from 'react-helmet';
import App from '../components/App';
import Header from '../containers/Header';
import SignUpFormContainer from '../containers/SignUpFormContainer';
import withData from '../libraries/withData';

export default withData(props =>
  <App>
    <Helmet>
      <title>SignIn :: RAN! Example</title>
    </Helmet>
    <Header pathname={props.url.pathname} />
    <SignUpFormContainer />
  </App>
);
