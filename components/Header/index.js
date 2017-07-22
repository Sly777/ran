import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinkList from '../LinkList';
import connect from './index.data';

const Header = ({ className, pathname, authenticated, logout }) =>
  <header className={className}>
    <LinkList
      pathname={pathname}
      authenticated={authenticated}
      logout={logout}
    />
  </header>;

Header.defaultProps = {
  authenticated: false
};

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(styled(Header)`
  margin-bottom: 25px;
`);
