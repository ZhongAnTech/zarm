const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config.base');

config.mode = 'development';

config.entry = {
  index: ['./examples/index.js'],
};

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
    filename: 'stylesheet/[name].css',
    chunkFilename: 'stylesheet/[id].css',
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
  })
);

Object.keys(config.entry).forEach((key) => {
  config.plugins.push(new HtmlWebpackPlugin({
    template: `./examples/${key}.html`,
    filename: `${key}.html`,
    chunks: ['manifest', key],
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

config.resolve.alias = {
  zarm: process.cwd(),
};

module.exports = config;
