var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require('./webpack.config.base');
var path = require('path');

config.entry = {
  index: [
    './examples/index.html',
    './examples/index.js'
  ]
};

// github gh-pages dir http://xxxx.com/dragon-ui/
config.output.publicPath = './';

config.module.loaders.push({
  test: /\.(js|jsx)$/, 
  loader: 'babel',
  exclude: /node_modules/
});

config.plugins.push(new ExtractTextPlugin('stylesheet/[name].css', {
  allChunks: true
}));
config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'vendors'
}));
config.plugins.push(new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  },
  __DEBUG__: true
}));
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  output: {
    comments: false,
  }
}));

module.exports = config;
