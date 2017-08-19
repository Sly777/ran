import { ThemeProvider } from 'styled-components'
import getTheme from '~/themes'

const JestThemed = ({ children, theme }) =>
  <ThemeProvider theme={getTheme(theme || 'main')}>
    {children}
  </ThemeProvider>

export default JestThemed
