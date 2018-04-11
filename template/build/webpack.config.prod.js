const path = require('path')
const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { css } = require('./webpack.loaders')
const { Config } = require('webpack-config')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const extractCSS = new ExtractTextPlugin({
  filename: 'static/css/style.[contenthash:8].css',
})

module.exports = new Config()
  .extend(path.resolve(paths.appBuild, 'webpack.config.base.js'))
  .merge({
    mode: 'production',
    optimization: {
      splitChunks: {
        chunks: 'initial',
        // minChunks: 1,
        name: true,
      },
      // concatenateModules: true,
      // namedModules: true,
      // minimize: false,
      // minimizer: [
      //   new UglifyJSPlugin({
      //     uglifyOptions: {
      //       beautify: false,
      //       compress: true,
      //       comments: false,
      //       mangle: false,
      //       toplevel: false,
      //       keep_classnames: true, // <-- doesn't exist, I guess. It's in harmony branch
      //       keep_fnames: true,
      //     },
      //   }),
      // ], // internal uglify-js by default
    },
    output: {
      path: paths.appDist,
      filename: 'static/js/[name].[chunkhash:8].js',
      chunkFilename: 'static/js/[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        ...css.getExtractCSSLoaders(extractCSS),
      ],
    },
    plugins: [
      extractCSS,
      new HtmlWebpackPlugin({
        template: path.resolve(paths.appSrc, 'index.html'),
        filename: 'index.html',
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'report.html',
        openAnalyzer: false,
      }),
    ],
  })
