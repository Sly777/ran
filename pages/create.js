import { Helmet } from 'react-helmet';
import App from '../components/App';
import Header from '../components/Header';
import CreatePost from '../components/CreateForm';
import withData from '../libraries/withData';

export default withData(props =>
  <App>
    <Helmet>
      <title>Create Post :: RAN! Example</title>
    </Helmet>
    <Header pathname={props.url.pathname} />
    <CreatePost />
  </App>
);
