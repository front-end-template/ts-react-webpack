const path = require('path')
const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { css } = require('./webpack.loaders')
const { Config } = require('webpack-config')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = new Config()
  .extend(path.resolve(paths.appBuild, 'webpack.config.base.js'))
  .merge({
    mode: 'production',
    optimization: {
      splitChunks: {
        chunks: 'all',
        // chunks: 'initial',
        minChunks: 1,
        name: true,
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
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
        ...css.getExtractCSSLoaders(),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[hash].css',
        chunkFilename: 'static/css/[id].[hash].css',
      }),
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

