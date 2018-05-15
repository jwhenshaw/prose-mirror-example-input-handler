var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve('babel-loader'),
      },
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
