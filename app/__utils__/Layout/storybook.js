import { ThemeProvider } from 'styled-components'
import { select } from '@storybook/addon-knobs'
import getTheme from '~/themes'

const themes = ['main', 'eightbit', 'inverted']
const defaultTheme = themes[0]
const themeSelector = select('Theme', themes, defaultTheme)

const StorybookLayout = ({ children, theme }) =>
  <ThemeProvider theme={getTheme(themeSelector)}>
    {children}
  </ThemeProvider>

export default StorybookLayout
