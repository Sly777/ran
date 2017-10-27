import styled from 'styled-components';

export const App = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

export const A = styled.a`
  color: ${props => props.theme.colors.main};

  &:active,
  &:hover {
    text-decoration: underline;
  }
`;

export const P = styled.p`
  font-size: ${props => props.theme.font.sizes.normal};
  line-height: ${props => props.theme.font.sizes.bigger};
`;

export const Article = styled.article`
  margin: ${props => props.theme.alignment.horizontalcenter};
  max-width: 650px;
`;

export const Button = styled.button`
  align-items: center;
  background-color: ${props => props.theme.colors.main};
  border: 0;
  color: ${props => props.theme.colors.textAlt};
  display: flex;
  padding: ${props => props.theme.spacing.smaller};
  &:active {
    background-color: ${props =>
      props.theme
        .helper(props.theme.colors.main)
        .darken(0.2)
        .string()};
    transition: background-color 0.3s;
  }
  &:focus {
    outline: none;
  }
`;
