const path = require('path')
const fs = require('fs')

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  // dotenv: resolveApp('.env'),
  dotenv: resolveApp('env/.env'),
  appDist: resolveApp('dist'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('src/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appIndexTsx: resolveApp('src/index.tsx'),
  appComponents: resolveApp('src/components'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appStyles: resolveApp('src/styles'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  yarnLockFile: resolveApp('yarn.lock'),
}
