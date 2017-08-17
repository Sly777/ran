import { ThemeProvider } from 'styled-components'
import getTheme from '~/themes'

const JestLayout = ({ children, theme }) =>
  <ThemeProvider theme={getTheme(theme || 'main')}>
    {children}
  </ThemeProvider>

export default JestLayout
