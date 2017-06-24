const UrlPrettifier = require('next-url-prettifier').default;

const routes = [];

//
// Because of awesome Next.js, You don't need to add routes for all pages.
// Every file on Pages folder basically has route as they named.
// (index.js => /, about.js => /about, ...etc.)
//
// If you want to change url (for SEO or put different path), please add your route below.
// for more info, please look at https://github.com/Sly777/ran/blob/master/docs/Routing.md
//
//
// Please add your route between of comments
//
// ------------ ROUTES ---------------

routes.push({
  page: 'details',
  prettyUrl: ({ postId = '', postTitle = '' }) =>
    `/details/${postId}/${postTitle}`,
  prettyUrlPatterns: [
    { pattern: '/details/:postId/:postTitle', defaultParams: { lang: 'en' } }
  ]
});

routes.push({
  page: 'create',
  prettyUrl: () => '/create_post',
  prettyUrlPatterns: [
    { pattern: '/create_post', defaultParams: { lang: 'en' } }
  ]
});

// ------------ ROUTES ---------------
//
//

const urlPrettifier = new UrlPrettifier(routes);

exports.default = routes;
exports.Router = urlPrettifier;
