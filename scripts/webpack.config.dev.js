const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config.base');

config.devtool = 'cheap-module-eval-source-map';

config.entry = {
  index: [
    './examples/index.js',
  ],
};

config.plugins.push(new ExtractTextPlugin({
  filename: 'stylesheet/[name].css',
  disable: false,
  allChunks: true,
}));

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'common',
}));

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  names: Object.keys(config.entry),
  async: 'common.async',
  children: true,
  minChunks(module, count) {
    return module.context && module.context.indexOf('node_modules') !== -1 && count >= 3;
  },
}));

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: '"development"',
  },
  __DEBUG__: true,
}));

Object.keys(config.entry).forEach((key) => {
  config.plugins.push(new HtmlWebpackPlugin({
    template: `./examples/${key}.html`,
    filename: `${key}.html`,
    chunks: ['common', key],
  }));
});

config.devServer = {
  contentBase: path.join(__dirname, '../examples'),
  publicPath: config.output.publicPath,
  host: '0.0.0.0',
  port: 3000,
  compress: true,
  noInfo: true,
  inline: true,
  hot: true,
};

module.exports = config;
