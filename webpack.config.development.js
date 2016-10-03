const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

/*
 * base settings
 */
const devPort = 4000;

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
  entry: Object.assign({}, getEntries([
    ...glob.sync('./frontend/javascripts/*.ts'),
    ...glob.sync('./frontend/javascripts/*.tsx'),
    ...glob.sync('./frontend/stylesheets/*.scss')
  ], ['babel-polyfill']), {
    vendor: [
      'babel-polyfill',
      'jquery',
      'moment',
      'lodash',
      'bootstrap-sass',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-actions',
      'redux-logger',
      'redux-saga',
      'whatwg-fetch'
    ],
  }),
  output: {
    filename: 'javascripts/[name].js',
    path: path.join(__dirname, 'public/dist'),
    publicPath: `http://localhost:${devPort}/`
  },
  // devtool: 'source-map',
  resolve: {
    alias: {
      actioncable: `${__dirname}/vendor/bundle/ruby/2.3.0/gems/actioncable-5.0.0.1/lib/assets/compiled/action_cable.js`
    },
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['babel', 'ts']
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin('stylesheets/[name].css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _: 'lodash',
      moment: 'moment'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'javascripts/vendor.bundle.js')
  ],
  sassLoader: { sourceComments: true },
  postcss: [
    autoprefixer({
      browser: [
        'last 2 versions',  // without IE, iOS, Android
        'ie >= 9',          // IE
        'ios >= 8',         // iOS
        'android >= 4.4'    // Android
      ]
    })
  ],
  devServer: {
    contentBase: '../public/dist',
    port: devPort
  }
};
