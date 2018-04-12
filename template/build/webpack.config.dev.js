/* eslint-disable function-paren-newline */
const path = require('path')
const paths = require('./paths')
const { css } = require('./webpack.loaders')
const { Config } = require('webpack-config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = new Config()
  // .extend(path.resolve(paths.appBuild, 'webpack.config.base.js'))
  .extend({
    './build/webpack.config.base.js': conf => {
      conf.entry.app.unshift(
        require.resolve('react-dev-utils/webpackHotDevClient'),
      )
      return conf
    },
  })
  .merge({
    mode: 'development',
    devtool: 'source-map',
    output: {
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(paths.appSrc, 'index.html'),
        filename: 'index.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
      rules: [
        ...css.getDevLoaders(),
      ],
    },
  })
