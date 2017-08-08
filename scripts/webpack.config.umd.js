const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('./webpack.config.base');

const env = process.env.WEBPACK_ENV;

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
  path: path.resolve(__dirname, '../dist'),
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
  disable: false,
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
} else {
  config.plugins.push(new ExtractTextPlugin(cssConfig));
}

module.exports = config;
