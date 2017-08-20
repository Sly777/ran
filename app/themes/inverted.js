import { mergeObjects } from '~/lib/helpers'
import main from './main'

export default mergeObjects(main, {
  colors: {
    main: '#DD4526',
    success: '#A347A3',
    warn: '#003F98',
    error: '#26ACB0',
    background: '#000000',
    text: '#ffffff',
    textAlt: '#000000'
  }
})
