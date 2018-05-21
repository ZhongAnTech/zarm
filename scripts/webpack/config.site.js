const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./config.base');

config.mode = 'production';

config.entry = {
  index: ['./examples/index.js'],
};

config.output.filename = 'js/[name].[chunkhash:8].js';
config.output.publicPath = './';

config.plugins.push(
  new MiniCssExtractPlugin({
    filename: 'stylesheet/[name].[contenthash:8].css',
    chunkFilename: 'stylesheet/[id].[contenthash:8].css',
  }),
  new webpack.optimize.SplitChunksPlugin({
    cacheGroups: {
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
      },
    },
  }),
  new webpack.optimize.RuntimeChunkPlugin({
    name: 'manifest',
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
  })
);

Object.keys(config.entry).forEach((key) => {
  config.plugins.push(new HtmlWebpackPlugin({
    template: `./examples/${key}.html`,
    filename: `${key}.html`,
    chunks: ['manifest', key],
  }));
});

config.resolve.alias = {
  zarm: process.cwd(),
};

module.exports = config;
