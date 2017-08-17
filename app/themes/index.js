import color from 'color'

import main from './main'
import inverted from './inverted'
import eightbit from './eightbit'

const themeList = {
  main,
  inverted,
  eightbit,
}

export default function getTheme(name) {
  const theme = themeList[name]
  if (!theme) throw new Error(`Wrong theme name: ${name}`)
  if (!theme.helper) theme.helper = color
  return theme
}
