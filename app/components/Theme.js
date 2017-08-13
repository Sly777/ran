import styled from 'styled-components'

export const App = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

export const A = styled.a`color: ${({ theme }) => theme.colors.main};`

export const P = styled.p`
  font-size: ${({ theme }) => theme.font.sizes.normal};
  line-height: ${({ theme }) => theme.font.sizes.bigger};
`

export const Article = styled.article`
  margin: ${({ theme }) => theme.alignment.horizontalcenter};
  max-width: 650px;
`

export const Button = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.main};
  border: 0;
  color: ${({ theme }) => theme.colors.textAlt};
  display: flex;
  padding: ${({ theme }) => theme.spacing.smaller};

  &:active {
    background-color: ${({ theme }) =>
      theme.helper(theme.colors.main).darken(0.2).string()};
    transition: background-color 0.3s;
  }

  &:focus {
    outline: none;
  }
`
