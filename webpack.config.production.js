const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const saveLicense = require('uglify-save-license');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

/*
 * utility methods
 */
function getEntries(files, appendFiles = []) {
  const result = {};
  files.forEach(filePath => {
    const fileName = path.basename(filePath);
    const fileNameWithoutExt = fileName.substr(0, fileName.lastIndexOf('.'));
    if (result[fileNameWithoutExt] == null) {
      result[fileNameWithoutExt] = [...appendFiles];
    }

    result[fileNameWithoutExt].push(filePath);
  });

  return result;
}

/*
 * webpack settings
 */
module.exports = {
  entry: getEntries([
    ...glob.sync('./frontend/javascripts/*.ts'),
    ...glob.sync('./frontend/javascripts/*.tsx'),
    ...glob.sync('./frontend/stylesheets/*.scss')
  ], ['babel-polyfill']),
  output: {
    filename: 'javascripts/[name].js',
    path: path.join(__dirname, 'public/dist')
  },
  // devtool: 'source-map',
  resolve: {
    alias: {
      actioncable: `${__dirname}/vendor/bundle/ruby/2.3.0/gems/actioncable-5.0.0/lib/assets/compiled/action_cable.js`
    },
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel', 'ts']
      },
      {
        test: /\.s[ac]ss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin('stylesheets/[name].css'),
    new ManifestPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: saveLicense
      }
    })
  ],
  postcss: [
    autoprefixer({
      browser: [
        'ie >= 11',               // IE
        'ie_mob >= 10',           // IE Mobile
        'last 2 edge versions',   // Microsoft Edge
        'ff >= 40',               // Firefox
        'chrome >= 44',           // Google Chrome
        'last 2 safari versions', // Safari
        'ios >= 8',               // iOS
        'android >= 4.4',         // Android
        'bb >= 10'                // BlackBerry
      ]
    })
  ]
};
