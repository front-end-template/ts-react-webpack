/* eslint global-require: 0 */
/* eslint-disable comma-dangle */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const css = {
  loaders: [
    {
      ext: 'css',
      use: [],
    },
    {
      ext: 's(c|a)ss',
      use: ['resolve-url-loader', 'sass-loader?sourceMap'],
    },
    {
      ext: 'less',
      use: [{
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }],
    },
    {
      ext: 'styl',
      use: ['stylus-loader'],
    },
  ],

  loaderDefaults: {
    minimize: false,
    localIdentName: '[local]-[hash:base64]',
    importLoaders: 1,
  },

  getModuleRegExp (ext) {
    return [
      {
        regex: `[^\\.local]\\.${ext}$`,
        modules: false
      },
      {
        regex: `[\\.local]\\.${ext}$`,
        modules: true
      }
    ]
  },

  getDevLoaders (sourceMap = true) {
    return css.loaders.reduce((result, loader) => {
      css.getModuleRegExp(loader.ext).forEach(mod => {
        result.push({
          test: new RegExp(mod.regex),
          loader: [
            'style-loader',
            {
              loader: 'typings-for-css-modules-loader',
              // loader: 'css-loader',
              query: Object.assign({}, css.loaderDefaults, {
                sourceMap,
                modules: mod.modules
              }),
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap,
                plugins: () => ([
                  require('autoprefixer'),
                  require('precss'),
                ]),
              },
            },
            ...loader.use
          ]
        })
      })
      return result
    }, [])
  },
  getExtractCSSLoaders (sourceMap = false) {
    return css.loaders.reduce((result, loader) => {
      css.getModuleRegExp(loader.ext).forEach(mod => {
        result.push({
          test: new RegExp(mod.regex),
          use: [
            MiniCssExtractPlugin.loader,
            {
              // loader: 'css-loader',
              loader: 'typings-for-css-modules-loader',
              query: Object.assign({}, css.loaderDefaults, {
                sourceMap,
                modules: mod.modules
              }),
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap,
                plugins: () => ([
                  require('autoprefixer'),
                  require('precss'),
                ]),
              },
            },
            ...loader.use,
          ],
        })
      })
      return result
    }, [])
  },
}

exports.css = css


// exports.loadCSS = ({ include, exclude } = {}) => ({
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         include,
//         exclude,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },
// })
//
// exports.loadPostcss = {
//   test: /\.css$/,
//   use: [
//     'style-loader',
//     'css-loader',
//     {
//       loader: 'postcss-loader',
//       options: {
//         plugins: () => ([
//           require('autoprefixer'),
//           require('precss'),
//         ]),
//       },
//     },
//   ],
// }
//
// {
//   test: /\.css$/,
//   use: [
//     require.resolve('style-loader'),
//     {
//       loader: require.resolve('css-loader'),
//       options: {
//         importLoaders: 1,
//       },
//     },
//     {
//       loader: require.resolve('postcss-loader'),
//       options: {
//         ident: 'postcss',
//         plugins: () => [
//           require('postcss-flexbugs-fixes'),
//           autoprefixer({
//             browsers: [
//               '>1%',
//               'last 4 versions',
//               'Firefox ESR',
//               'not ie < 9', // React doesn't support IE8 anyway
//             ],
//             flexbox: 'no-2009',
//           }),
//         ],
//       },
//     },
//   ],
// },

