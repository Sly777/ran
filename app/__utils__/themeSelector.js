import { select } from '@storybook/addon-knobs'

const themes = ['main', 'eightbit', 'inverted']
const defaultTheme = themes[0]

export default select('Theme', themes, defaultTheme)
