import { connect } from 'react-redux';
import withApollo from './apollo';
import { dispatchers } from '../AuthFields/store';
import Feature from './feature';

const mapDispatchToProps = dispatch => ({
  actions: {
    signInUser(token) {
      dispatch(dispatchers.signIn(token));
    }
  }
});

const FeatureWithData = withApollo(Feature);

export default connect(null, mapDispatchToProps)(FeatureWithData);
