const { entry, output, resolve, loaders, plugins, sassLoader, postcss } = require('./webpack.config.base');

/*
 * base settings
 */
const devPort = 4000;

/*
 * webpack settings
 */
module.exports = {
  entry,
  output: Object.assign({}, output, { publicPath: `http://localhost:${devPort}/` }),
  // devtool: 'source-map',
  resolve,
  module: { loaders },
  plugins,
  sassLoader,
  postcss,
  devServer: {
    contentBase: '../public/dist',
    port: devPort
  }
};
