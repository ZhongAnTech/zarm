const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./config.base');
const { version } = require('../../package.json');

config.mode = 'development';
config.devtool = 'source-map';

config.entry = {
  zarm: [
    './components/index.tsx',
  ],
};

config.output = {
  library: 'zarm',
  libraryTarget: 'umd',
  path: path.join(process.cwd(), 'dist'),
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

const env = process.env.NODE_ENV;
const cssConfig = {
  filename: 'stylesheet/[name].css',
  chunkFilename: 'stylesheet/[id].css',
};
if (env === 'production') {
  config.mode = 'production';
  config.output.filename = '[name].min.js';
  // config.plugins.push(
  //   new BundleAnalyzerPlugin({
  //     analyzerMode: 'static',
  //   })
  // );

  cssConfig.filename = '[name].min.css';
  cssConfig.chunkFilename = '[id].min.css';
}

config.plugins.push(
  new MiniCssExtractPlugin(cssConfig),
  new webpack.BannerPlugin(`
    Zarm v${version}

    Github: https://github.com/ZhonganTechENG/zarm

    Copyright (c) 2013-present, ZhonganTech, Inc.

    This source code is licensed under the MIT license found in the
    LICENSE file in the root directory of this source tree.
  `)
);

module.exports = config;
