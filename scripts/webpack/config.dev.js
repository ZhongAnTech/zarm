const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const config = require('./config.deploy');

config.mode = 'development';
config.devtool = 'cheap-module-eval-source-map';
config.output.filename = 'js/[name].js';
config.output.publicPath = '/';
config.optimization.minimize = false;
config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new ForkTsCheckerWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './site/demo/index_umd.html',
    filename: 'demo_umd.html',
    inject: false,
  })
);
config.module.rules[0].use[0].options.plugins.push('react-hot-loader/babel');
config.devServer = {
  host: '192.168.32.64',
  port: 3000,
  compress: true,
  noInfo: true,
  inline: true,
  hot: true,
};

module.exports = config;
