import PropTypes from 'prop-types';
import { ThemeProvider, injectGlobal } from 'styled-components';
import themeList from './../libraries/theme';

const App = ({ children, theme }) => {
  const themeName = !themeList[theme] ? 'main' : theme;

  return (
    <ThemeProvider theme={themeList[themeName]}>
      <main>
        {children}
      </main>
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
    padding: 25px 50px;
  }
  a {
    color: #22BAD9;
  }
  p {
    font-size: 14px;
    line-height: 24px;
  }
  article {
    margin: 0 auto;
    max-width: 650px;
  }
  button {
    align-items: center;
    background-color: #22BAD9;
    border: 0;
    color: white;
    display: flex;
    padding: 5px 7px;
  }
  button:active {
    background-color: #1B9DB7;
    transition: background-color .3s
  }
  button:focus {
    outline: none;
  }
`;

export default App;
