import PropTypes from 'prop-types';
import { ThemeProvider, injectGlobal } from 'styled-components';
import color from 'color';
import ReactGA from 'react-ga';
import themeList from '../libraries/theme';
import { App as ThemedApp } from '../components/Theme';

if (process.browser && !window.reactGaInit) {
  ReactGA.initialize('UA-104637848-1');
  window.reactGaInit = true;
} else if (process.browser && window.reactGaInit) {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

let offlineInstalled = false;

const App = ({ children, theme }) => {
  const themeName = !themeList[theme] ? 'main' : theme;
  if (!themeList[themeName].helper) themeList[themeName].helper = color;

  if (process.env.OFFLINE_SUPPORT && process.browser && !offlineInstalled) {
    const OfflinePlugin = require('offline-plugin/runtime'); // eslint-disable-line global-require

    OfflinePlugin.install({
      onUpdateReady() {
        OfflinePlugin.applyUpdate();
      },
      onUpdated() {
        window.location.reload();
      }
    });
    offlineInstalled = true;
  }

  return (
    <ThemeProvider theme={themeList[themeName]}>
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
