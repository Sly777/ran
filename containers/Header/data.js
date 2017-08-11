import { connect } from 'react-redux';
import { dispatchers } from '~/libraries/stores/auth';

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  actions: {
    logout: () => dispatch(dispatchers.signOut())
  }
});

export default comp => connect(mapStateToProps, mapDispatchToProps)(comp);
