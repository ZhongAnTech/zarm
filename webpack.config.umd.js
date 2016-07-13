var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require('./webpack.config.base');
var path = require('path');

config.entry = {
  'dragon-ui': [
    './components/index.js',
    './styles/index.scss'
  ]
};

config.output = {
  library: 'DragonUI',
  libraryTarget: 'umd',
  path: path.join(process.cwd(), 'dist'),
  filename: '[name].js',
};

config.module.loaders.push({
  test: /\.(js|jsx)$/, 
  loader: 'babel',
  exclude: /node_modules/
});

config.plugins.push(new ExtractTextPlugin('[name].css', {
  allChunks: true
}));

config.externals = {
  'react': {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
  }
};


module.exports = config;
