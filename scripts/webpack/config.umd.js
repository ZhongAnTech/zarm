const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./config.base');
const version = require('../../package.json').version;

const env = process.env.NODE_ENV;

config.devtool = 'source-map';

config.entry = {
  zarm: [
    './components/index.js',
    './styles/index.scss',
  ],
};

config.output = {
  library: 'Zarm',
  libraryTarget: 'umd',
  path: path.resolve(__dirname, '../../dist'),
  filename: '[name].js',
};

config.externals = {
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom',
  },
};

const cssConfig = {
  filename: '[name].css',
  allChunks: true,
};

if (env === 'production') {
  cssConfig.filename = '[name].min.css';
  config.plugins.push(new ExtractTextPlugin(cssConfig));
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

  config.output.filename = '[name].min.js';
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

  config.plugins.push(new webpack.BannerPlugin(`
  Zarm v${version}

  Github: https://github.com/ZhonganTechENG/zarm
 
  Copyright (c) 2013-present, ZhonganTech, Inc.
 
  This source code is licensed under the MIT license found in the
  LICENSE file in the root directory of this source tree.
  `));

  // config.plugins.push(new BundleAnalyzerPlugin({
  //   analyzerMode: 'static',
  // }));
} else {
  config.plugins.push(new ExtractTextPlugin(cssConfig));
}

config.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(env || 'production'),
  __DEBUG__: false,
}));

module.exports = config;
