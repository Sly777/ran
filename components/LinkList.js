import { Link } from 'next-url-prettifier';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Router } from '../routes';

const LinkList = ({ className, pathname, authenticated, logout }) =>
  <nav className={className}>
    <Link prefetch href="/">
      <a className={pathname === '/' && 'is-active'}>Main Page</a>
    </Link>
    <Link prefetch route={Router.linkPage('create')}>
      <a className={pathname === '/create_post' && 'is-active'}>Create</a>
    </Link>
    {!authenticated &&
      <Link prefetch route={Router.linkPage('signin')}>
        <a className={pathname === '/sign_in' && 'is-active'}>SignIn</a>
      </Link>}
    {!authenticated &&
      <Link prefetch route={Router.linkPage('signup')}>
        <a className={pathname === '/sign_up' && 'is-active'}>SignUp</a>
      </Link>}
    {authenticated &&
      <button
        role="link"
        href="#"
        onClick={() => logout()}
        className={pathname === '/sign_up' && 'is-active'}
      >
        LogOut
      </button>}
    <a
      href="https://github.com/Sly777/ran"
      rel="noopener noreferrer"
      target="_blank"
    >
      RAN! @ Github
    </a>
  </nav>;

LinkList.propTypes = {
  pathname: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default styled(LinkList)`
  a {
    font-size: 14px;
    margin-right: 15px;
    text-decoration: none;
    cursor: pointer;

    &.is-active {
      text-decoration: underline;
    }
  }
  button {
    display: inline-block;
    margin-right: 15px;
  }
`;
