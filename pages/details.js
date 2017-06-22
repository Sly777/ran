import { Helmet } from 'react-helmet';
import App from '../components/App';
import Header from '../components/Header';
import PostInfo from '../components/PostInfo';
import withData from '../libraries/withData';

export default withData(props =>
  <App>
    <Helmet>
      <title>
        {decodeURIComponent(props.url.query.postTitle)} :: RAN! Example
      </title>
    </Helmet>
    <Header pathname={props.url.pathname} />
    <PostInfo
      postId={props.url.query.postId}
      postTitle={props.url.query.postTitle}
    />
  </App>
);
