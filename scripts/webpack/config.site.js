const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./config.base');

config.entry = {
  index: ['./examples/index.js'],
  common: ['react', 'react-dom', 'react-router-dom'],
};

config.output.filename = 'js/[name].[chunkhash:8].js';
config.output.publicPath = './';

config.plugins.push(new ExtractTextPlugin({
  filename: 'stylesheet/[name].[contenthash:8].css',
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
  name: ['common', 'manifest'],
}));

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  names: Object.keys(config.entry),
  async: true,
  children: true,
  minChunks: 3,
}));

config.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEBUG__: false,
}));

// config.plugins.push(new BundleAnalyzerPlugin({
//   analyzerMode: 'static',
// }));

Object.keys(config.entry).forEach((key) => {
  if (key === 'common') return;
  config.plugins.push(new HtmlWebpackPlugin({
    template: `./examples/${key}.html`,
    filename: `${key}.html`,
    chunks: ['common', 'manifest', key],
  }));
});

module.exports = config;
