import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import App from './App';
import Header from '../Header';

const Default = props =>
  <App>
    <Helmet>
      <title>
        {props.title !== '' ? `${props.title} :: RAN! Example` : 'RAN! Example'}
      </title>
    </Helmet>
    <Header pathname={props.url.pathname} />
    {props.children}
  </App>;

Default.propTypes = {
  title: PropTypes.string,
  url: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

Default.defaultProps = {
  title: ''
};

export default Default;
