const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config.base');

config.entry = {
  index: [
    './examples/index.js',
  ],
};

config.output.publicPath = './';

config.plugins.push(new ExtractTextPlugin({
  filename: 'stylesheet/[name].css',
  disable: false,
  allChunks: true,
}));

config.plugins.push(new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.css$/g,
  cssProcessor: require('cssnano'),
  cssProcessorOptions: {
    discardComments: {
      removeAll: true,
    },
  },
  canPrint: true,
}));

config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
  output: {
    comments: false,
  },
  sourceMap: true,
  mangle: true,
}));

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'common',
}));

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  names: Object.keys(config.entry),
  async: 'common.async',
  children: true,
  minChunks: 3,
}));

config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: '"production"',
  },
  __DEBUG__: false,
}));

Object.keys(config.entry).forEach((key) => {
  config.plugins.push(new HtmlWebpackPlugin({
    template: `./examples/${key}.html`,
    filename: `${key}.html`,
    chunks: ['common', key],
  }));
});

module.exports = config;
