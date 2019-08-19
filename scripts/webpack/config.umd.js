const path = require('path');
const webpack = require('webpack');
const isWsl = require('is-wsl');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./config.base');

const env = process.env.NODE_ENV;
const { version } = require('../../package.json');

config.mode = 'development';
config.devtool = 'source-map';

config.entry = {
  zarm: [
    './components/style/entry.tsx',
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

const cssConfig = {
  filename: '[name].css',
};

if (env === 'production') {
  cssConfig.filename = '[name].min.css';
  config.mode = 'production';
  config.output.filename = '[name].min.js';
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

  // config.plugins.push(
  //   new BundleAnalyzerPlugin({
  //     analyzerMode: 'static',
  //   })
  // );
}

config.plugins.push(
  new MiniCssExtractPlugin(cssConfig),
  new webpack.BannerPlugin(`
    Zarm v${version}

    Github: https://github.com/ZhonganTechENG/zarm

    Copyright (c) 2013-present, ZhonganTech, Inc.

    This source code is licensed under the MIT license found in the
    LICENSE file in the root directory of this source tree.
  `),
);

module.exports = config;
