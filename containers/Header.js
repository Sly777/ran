import { connect } from 'react-redux';

import { signOut } from '../actions';
import Header from '../components/Header';

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(signOut());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
