import PropTypes from 'prop-types';
import { Link } from '../../routes';
import { A, LogOutButton } from './styles';

const LinkList = ({ pathname, authenticated, logout }) => (
  <nav>
    <Link prefetch href="/" passHref>
      <A active={pathname === '/'}>Main Page</A>
    </Link>
    <Link prefetch route="create" passHref>
      <A active={pathname === '/create_post'}>Create</A>
    </Link>
    {!authenticated && (
      <Link prefetch route="signin" passHref>
        <A active={pathname === '/sign_in'}>SignIn</A>
      </Link>
    )}
    {!authenticated && (
      <Link prefetch route="signup" passHref>
        <A active={pathname === '/sign_up'}>SignUp</A>
      </Link>
    )}
    {authenticated && (
      <LogOutButton
        role="link"
        href="#"
        onClick={() => logout()}
        active={pathname === '/sign_up'}
      >
        LogOut
      </LogOutButton>
    )}
    <A
      href="https://github.com/Sly777/ran"
      rel="noopener noreferrer"
      target="_blank"
    >
      RAN! @ Github
    </A>
  </nav>
);

LinkList.propTypes = {
  pathname: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default LinkList;
