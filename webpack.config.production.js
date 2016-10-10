const { optimize: { UglifyJsPlugin } } = require('webpack');
const saveLicense = require('uglify-save-license');
const ManifestPlugin = require('webpack-manifest-plugin');

const { entry, output, resolve, loaders, plugins, postcss } = require('./webpack.config.base');

/*
 * webpack settings
 */
module.exports = {
  entry,
  output,
  resolve,
  module: { loaders },
  plugins: [
    ...plugins,
    new ManifestPlugin(),
    new UglifyJsPlugin({
      minimize: true,
      output: { comments: saveLicense }
    })
  ],
  postcss
};
