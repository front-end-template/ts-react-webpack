const paths = require('./paths')
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      paths.appIndexJs,
    ],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: paths.appDist,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: [
      paths.appSrc,
      'node_modules',
    ],
    alias: {
      '@': paths.appSrc,
      components: paths.appComponents,
      styles: paths.appStyles,
      pages: paths.appPages,
      lib: paths.appLib,
      services: paths.appServices,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        include: /rxjs/,
        enforce: 'pre',
      },
      {
        test: /\.(js|jsx|mjs|ts|tsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: paths.appSrc,
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: false,
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
              libraryName: 'antd',
              libraryDirectory: 'lib',
              style: true,
            })],
          }),
          compilerOptions: {
            module: 'ESNext',
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: paths.appSrc,
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/assets/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                ['env', {
                  targets: {
                    browsers: ['chrome > 40', 'ios > 6', 'android > 4.4'],
                  },
                  modules: false,
                }],
                'react',
                'stage-2',
              ],
              plugins: [
                'transform-decorators-legacy',
                'react-hot-loader/babel',
                'syntax-dynamic-import',
              ],
              cacheDirectory: true,
            },
            // options: {
            //   presets: [
            //     ['@babel/preset-env', {
            //       targets: {
            //         browsers: ['chrome > 50', 'ios > 6', 'android > 4.4'],
            //       },
            //       modules: false,
            //     }],
            //     '@babel/preset-react',
            //     '@babel/preset-stage-2',
            //   ],
            //   plugins: ['transform-decorators-legacy'],
            //   cacheDirectory: true,
            // },
          },
        ],
      },
    ],
  },
}

