const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { IgnorePlugin } = require('webpack')
const OfflinePlugin = require('offline-plugin')

module.exports = {
  webpack: (config, { dev }) => {
    const prod = !dev

    config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/))

    // Image task to use images in component directory
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        // using emit-file-loader just to shut up 'Cannot find module',
        // it will make copy of image in component directory
        {
          loader: 'emit-file-loader',
          options: {
            name: 'dist/[path][name].[ext]'
          }
        },
        // this will create image copy, that we will use
        {
          loader: 'url-loader',
          options: {
            // output image like '/.next/static/longhash.png'
            outputPath: 'static/',
            // this dont change url of image,
            // this is used just to shut up '__webpack_public_path__ is not defined'
            publicPath: '/_next/webpack/',
            limit: 1000
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            gifsicle: {
              interlaced: false
            },
            optipng: {
              optimizationLevel: 7
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            mozjpeg: {
              progressive: true,
              quality: 65
            }
          }
        }
      ]
    })

    // FIXME: not fixing gql and graphql files, but fixing js files
    if (dev) {
      config.module.rules.push({
        test: /\.(jsx?|gql|graphql)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          fix: true
        }
      })
    }

    if (process.env.ANALYZE_BUILD) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true
        })
      )
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
              return null
            }

            if (asset[0] === '/') {
              return asset
            }

            if (asset.indexOf('bundles/pages/') === 0) {
              return `/_next/-/${asset
                .replace('bundles/pages', 'page')
                .replace('index.js', '')
                .replace(/\.js$/, '')}`
            }

            return `/_next/-/${asset}`
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
      )
    }

    return config
  }
}
