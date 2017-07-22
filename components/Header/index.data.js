import { connect } from 'react-redux';
import { actions } from '../SignInForm/index.data';

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(actions.signout());
  }
});

export default comp => connect(mapStateToProps, mapDispatchToProps)(comp);
