import { connect } from 'react-redux';
import { signoutAction } from '../actions';
import Header from '../components/Header';

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(signoutAction());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
