import PropTypes from 'prop-types'
import { ThemeProvider, injectGlobal } from 'styled-components'
import getTheme from '~/themes'
import installOfflinePlugin from '~/lib/installOfflinePlugin'
import { App as StyledApp } from '~/components/Theme'

const App = ({ children, theme }) => {
  installOfflinePlugin()

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <StyledApp>
        {children}
      </StyledApp>
    </ThemeProvider>
  )
}

App.defaultProps = {
  theme: 'main',
}

App.propTypes = {
  children: PropTypes.array.isRequired,
  theme: PropTypes.string,
}

injectGlobal`
  * {
    font-family: Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace, serif;
  }

  body {
    margin: 0;
    padding: 20px 40px;
  }
`

export default App
