import { connect } from 'react-redux';
import { dispatchers } from '../AuthFields/index.data';

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(dispatchers.signOut());
  }
});

export default comp => connect(mapStateToProps, mapDispatchToProps)(comp);
