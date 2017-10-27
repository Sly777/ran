import PropTypes from 'prop-types';
import LinkList from '../../components/LinkList';
import { Header as StyledHeader, Img } from './styles';
import connect from './store';

const Header = ({ pathname, authenticated, actions: { logout } }) => (
  <StyledHeader>
    <Img
      alt="RAN!"
      src="https://user-images.githubusercontent.com/694940/29736531-6ab509e8-8a02-11e7-8e61-66e5ea4e29b8.png"
    />
    <LinkList
      pathname={pathname}
      authenticated={authenticated}
      logout={logout}
    />
  </StyledHeader>
);

Header.defaultProps = {
  authenticated: false
};

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  authenticated: PropTypes.bool,
  actions: PropTypes.shape({
    logout: PropTypes.func.isRequired
  }).isRequired
};

export default connect(Header);
