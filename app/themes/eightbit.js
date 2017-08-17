import { mergeObjects } from '~/lib/helpers'
import main from './main'

export default mergeObjects(main, {
  colors: {
    main: '#40337f',
    success: '#1bcb01',
    error: '#722640',
    background: '#000000',
    text: '#ffffff',
  },
  font: {
    family: {
      normal: 'Consolas, monaco, monospace',
    },
  },
})
