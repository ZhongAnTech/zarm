var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./webpack.config.base');

config.devtool = 'cheap-module-eval-source-map';
config.entry = {
  index: [
    'webpack-dev-server/client?http://127.0.0.1:3000',
    'webpack/hot/only-dev-server',
    './examples/index.js'
  ]
};
config.plugins.push(new ExtractTextPlugin('stylesheet/[name].css', {
  allChunks: true
}));
config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'vendors'
}));
config.module.loaders.push({
  test: /\.(js|jsx)$/, 
  loader: 'react-hot!babel',
  exclude: /node_modules/
});
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("development")
  },
  __DEBUG__: true
}));

for (var key in config.entry) {
  if (key == 'vendors') {
    continue;
  }
  config.plugins.push(new HtmlWebpackPlugin({
    template: './examples/' + key + '.html',
    filename: key + '.html',
    chunks: ['vendors', key]
  }));
}

module.exports = config;
