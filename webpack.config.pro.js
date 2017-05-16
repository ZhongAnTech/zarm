const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config.base');

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
  name: 'vendors',
}));

config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
  __DEBUG__: true,
}));

for (var key in config.entry) {
  if (key === 'vendors') {
    continue;
  }
  config.plugins.push(new HtmlWebpackPlugin({
    template: `./examples/${key}.html`,
    filename: `${key}.html`,
    chunks: ['vendors', key],
  }));
}

module.exports = config;
