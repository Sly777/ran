import PropTypes from 'prop-types';
import styled from 'styled-components';

const ThemedApp = ({ className, children }) =>
  <div className={className}>
    {children}
  </div>;

ThemedApp.propTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired
};

export default styled(ThemedApp)`
  a {
    color: ${props => props.theme.colors.main};
  }
  p {
    font-size: ${props => props.theme.font.sizes.normal};
    line-height: ${props => props.theme.font.sizes.bigger};
  }
  article {
    margin: ${props => props.theme.alignment.horizontalCenter};
    max-width: 650px;
  }
  button {
    align-items: center;
    background-color: ${props => props.theme.colors.main};
    border: 0;
    color: ${props => props.theme.colors.textAlt};
    display: flex;
    padding: ${props => props.theme.spacing.smaller};
  }
  button:active {
    background-color: ${props =>
      props.theme.helper(props.theme.colors.main).darken(0.2).string()};
    transition: background-color .3s
  }
  button:focus {
    outline: none;
  }
`;
