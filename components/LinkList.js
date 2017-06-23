import { Link } from 'next-url-prettifier';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Router } from '../routes';

const LinkList = ({ className, pathname }) =>
  <nav className={className}>
    <Link prefetch href="/">
      <a className={pathname === '/' && 'is-active'}>Main Page</a>
    </Link>
    <Link prefetch route={Router.linkPage('create')}>
      <a className={pathname === '/create_post' && 'is-active'}>Create</a>
    </Link>
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
  className: PropTypes.string.isRequired
};

export default styled(LinkList)`
  a {
    font-size: 14px;
    margin-right: 15px;
    text-decoration: none;

    &.is-active {
      text-decoration: underline;
    }
  }
`;
