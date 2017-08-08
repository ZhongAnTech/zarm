const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config.base');

config.devtool = 'cheap-module-eval-source-map';

config.entry = {
  index: [
    'webpack-dev-server/client?http://127.0.0.1:3000',
    'webpack/hot/only-dev-server',
    './examples/index.js',
  ],
};

config.plugins.push(new ExtractTextPlugin({
  filename: 'stylesheet/[name].css',
  disable: false,
  allChunks: true,
}));

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'vendors',
}));

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
  __DEBUG__: true,
}));

Object.keys(config.entry).map((item) => {
  if (item !== 'vendors') {
    config.plugins.push(new HtmlWebpackPlugin({
      template: `./examples/${item}.html`,
      filename: `${item}.html`,
      chunks: ['vendors', item],
    }));
  }
  return false;
});

module.exports = config;
