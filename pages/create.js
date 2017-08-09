import CreatePost from '../containers/CreatePost';
import withData from '../libraries/withData';
import DefaultCon from '../layouts/Default';

export default withData(props =>
  <DefaultCon title="Create Post" {...props}>
    <CreatePost />
  </DefaultCon>
);
