import PropTypes from 'prop-types';
import { ThemeProvider, injectGlobal } from 'styled-components';
import getTheme from '../libraries/themes';
import installOfflinePlugin from '../libraries/installOfflinePlugin';
import { App as ThemedApp } from '../components/Theme';

const App = ({ children, theme }) => {
  installOfflinePlugin();

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <ThemedApp>
        {children}
      </ThemedApp>
    </ThemeProvider>
  );
};

App.defaultProps = {
  theme: 'main'
};

App.propTypes = {
  children: PropTypes.array.isRequired,
  theme: PropTypes.string
};

injectGlobal`
  * {
    font-family: Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace, serif;
  }
  body {
    margin: 0;
    padding: 20px 40px;
  }
`;

export default App;
