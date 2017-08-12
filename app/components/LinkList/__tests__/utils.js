import { ThemeProvider } from 'styled-components'
import getTheme from '~/themes'

// eslint-disable-next-line import/prefer-default-export
export const themeDecorator = name => child =>
  <ThemeProvider theme={getTheme(name)}>
    {child}
  </ThemeProvider>
