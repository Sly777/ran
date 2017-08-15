import ReactGA from 'react-ga';
import Router from 'next/router';

const debug = process.env.NODE_ENV !== 'production';
let lastTrackedPath = null;

export default () => {};

const trackPageview = (path = document.location.pathname) => {
  if (path !== lastTrackedPath) {
    ReactGA.set({ page: path });
    ReactGA.pageview(path);
    lastTrackedPath = path;
  }
};

const initGa = () => {
  if (!window.GA_INITIALIZED) {
    ReactGA.initialize('UA-104637848-1', { debug });
    window.GA_INITIALIZED = true;
    Router.router.events.on('routeChangeComplete', trackPageview);
  }
};

const onComponentDidMount = () => {
  initGa();
  trackPageview();
};

export { initGa, trackPageview, onComponentDidMount };
