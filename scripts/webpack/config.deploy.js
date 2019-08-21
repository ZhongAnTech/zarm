const path = require('path');
const webpack = require('webpack');
const isWsl = require('is-wsl');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./config.base');

const env = process.env.NODE_ENV;
const { version } = require('../../package.json');

config.mode = 'production';
config.devtool = 'source-map';
config.output.filename = 'js/[name].[chunkhash:8].js';
config.output.publicPath = './';
config.entry = {
  index: ['./site/web/index.js'],
  demo: ['./site/demo/index.js'],
};
config.optimization = {
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        parse: {
          ecma: 8,
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2,
        },
        mangle: {
          safari10: true,
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true,
        },
      },
      parallel: !isWsl,
      cache: true,
      sourceMap: true,
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        parser: safePostCssParser,
      },
      cssProcessorPluginOptions: {
        preset: ['default', {
          reduceTransforms: false,
          discardComments: {
            removeAll: true,
          },
          calc: false,
        }],
      },
    }),
  ],
};
config.plugins.push(
  // new BundleAnalyzerPlugin({
  //   analyzerMode: 'static',
  // }),
  new MiniCssExtractPlugin({
    filename: 'stylesheet/[name].[contenthash:8].css',
    chunkFilename: 'stylesheet/[id].[contenthash:8].css',
  }),
  new webpack.optimize.SplitChunksPlugin({
    chunks: 'async',
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    // cacheGroups: {
    //   styles: {
    //     name: 'styles',
    //     test: /\.s?css$/,
    //     chunks: 'all',
    //     minChunks: 5,
    //     enforce: true,
    //   },
    // },
  }),
  new webpack.optimize.RuntimeChunkPlugin({
    name: 'manifest',
  }),

  new HtmlWebpackPlugin({
    template: './site/web/index.html',
    filename: 'index.html',
    chunks: ['manifest', 'index'],
    favicon: './site/favicon.ico',
  }),
  new HtmlWebpackPlugin({
    template: './site/demo/index.html',
    filename: 'demo.html',
    chunks: ['manifest', 'demo'],
    favicon: './site/favicon.ico',
  }),
);

// if (env === 'production') {
//   config.plugins.push(new SentryCliPlugin({
//     release: version,
//     include: './assets',
//     sourceMapReference: false,
//   }));
// }

// Object.keys(config.entry).forEach((key) => {
//   config.plugins.push(new HtmlWebpackPlugin({
//     template: config.entry[key],
//     filename: `${key}.html`,
//     chunks: ['manifest', key],
//   }));
// });

config.resolve.alias = {
  zarm: process.cwd(),
  '@': path.resolve(__dirname, '../../'),
  '@site': path.resolve(__dirname, '../../site'),
};

module.exports = config;
