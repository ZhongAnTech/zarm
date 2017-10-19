const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config.base');

config.devtool = 'cheap-module-eval-source-map';

config.entry = {
  index: ['./examples/index.js'],
  common: ['react', 'react-dom', 'react-router-dom'],
};

config.plugins.push(new ExtractTextPlugin({
  filename: 'stylesheet/[name].css',
  allChunks: true,
}));

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: ['common', 'manifest'],
}));

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  names: Object.keys(config.entry),
  async: true,
  children: true,
  minChunks: 3,
}));

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEBUG__: true,
}));

Object.keys(config.entry).forEach((key) => {
  if (key === 'common') return;
  config.plugins.push(new HtmlWebpackPlugin({
    template: `./examples/${key}.html`,
    filename: `${key}.html`,
    chunks: ['common', 'manifest', key],
  }));
});

config.module.rules[0].use[0].options.presets.push('react-hmre');

config.devServer = {
  publicPath: config.output.publicPath,
  host: '0.0.0.0',
  port: 3000,
  compress: true,
  noInfo: true,
  inline: true,
  hot: true,
};

module.exports = config;
