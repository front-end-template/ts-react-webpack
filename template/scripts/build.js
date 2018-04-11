/* eslint-disable */
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const paths = require('../build/paths')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config.prod')
const spinner = ora('building for production...')
spinner.start()

rm(paths.appDist, err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(`${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    })}\n\n`)
    console.log(chalk.cyan('  Build complete.\n'))
  })
})
