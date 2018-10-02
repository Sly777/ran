/* eslint-disable global-require */
const { IgnorePlugin } = require('webpack');
const OfflinePlugin = require('offline-plugin');
const Dotenv = require('dotenv-webpack');
const router = require('./routes');

const initExport = {
  webpack: (config, { dev, isServer }) => {
    const prod = !dev;

    config.plugins.push(new Dotenv({ path: './public.env' }));
    config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/));

    if (dev) {
      config.module.rules.push({
        test: /\.(jsx?|gql|graphql)$/,
        loader: 'eslint-loader',
        exclude: ['/node_modules/', '/.next/', '/helper_scripts/'],
        enforce: 'pre'
      });
    }

    if (process.env.ANALYZE_BUILD) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true
        })
      );
    }

    if (prod && process.env.OFFLINE_SUPPORT) {
      config.plugins.push(
        new OfflinePlugin({
          publicPath: '/',
          relativePaths: false,
          externals: ['/', '/manifest.html'],
          excludes: ['.htaccess'],
          safeToUseOptionalCaches: true,
          caches: 'all',
          rewrites: function rewrites(asset) {
            if (
              asset.indexOf('.hot-update.js') > -1 ||
              asset.indexOf('build-stats.json') > -1 ||
              asset === 'BUILD_ID' ||
              asset.indexOf('dist/') === 0
            ) {
              return null;
            }

            if (asset[0] === '/') {
              return asset;
            }

            if (asset.indexOf('bundles/pages/') === 0) {
              return `/_next/-/${asset
                .replace('bundles/pages', 'page')
                .replace('index.js', '')
                .replace(/\.js$/, '')}`;
            }

            return `/_next/-/${asset}`;
          },
          autoUpdate: 1000 * 60 * 5,
          __tests: dev ? { ignoreRuntime: true } : {},
          ServiceWorker: {
            events: true,
            navigateFallbackURL: '/'
          },
          AppCache: {
            directory: './',
            events: true
          }
        })
      );
    }

    return config;
  }
};

if (process.env.STATIC_EXPORT) {
  initExport.exportPathMap = function exportPathMap() {
    const routes = {};
    routes['/'] = {
      page: '/'
    };
    router.routes.forEach(route => {
      if (!route.pattern.includes(':')) {
        routes[route.pattern] = {
          page: route.page
        };
      }
    });

    return routes;
  };
}

/* eslint-enable global-require */
module.exports = initExport;
