import CreatePost from '../components/CreateForm';
import withData from '../libraries/withData';
import DefaultCon from '../containers/Default';

export default withData(props =>
  <DefaultCon title="Create Post" {...props}>
    <CreatePost />
  </DefaultCon>
);
