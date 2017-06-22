const UrlPrettifier = require('next-url-prettifier').default;

const routes = [];

routes.push({
  page: 'details',
  prettyUrl: ({ postId = '', postTitle = '' }) =>
    `/details/${postId}/${postTitle}`,
  prettyUrlPatterns: [
    { pattern: '/details/:postId/:postTitle', defaultParams: { lang: 'en' } }
  ]
});

const urlPrettifier = new UrlPrettifier(routes);

exports.default = routes;
exports.Router = urlPrettifier;
