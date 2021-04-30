import isWsl from 'is-wsl';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import safePostCssParser from 'postcss-safe-parser';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpackMerge from 'webpack-merge';
import WebpackBar from 'webpackbar';
import webpack, { Configuration } from 'webpack';
import babelConfig from './babelConfig/base';

const optimization: Configuration['optimization'] = {
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
        preset: [
          'default',
          {
            reduceTransforms: false,
            discardComments: {
              removeAll: true,
            },
            calc: false,
          },
        ],
      },
    }),
  ],
};

const config: Configuration = {
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: babelConfig,
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: [
                require('postcss-flexbugs-fixes'),
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
              ],
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: true,
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 1,
              name: 'images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader?name=fonts/[name].[hash:8].[ext]',
          },
        ],
      },
      // {
      //   test: /\.md$/,
      //   use: require.resolve('raw-loader'),
      // },
    ],
  },

  resolve: {
    extensions: [' ', '.ts', '.tsx', '.js', '.jsx', '.scss', '.svg'],
    alias: {
      // react-devtools support to profiling
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
  },

  plugins: [new WebpackBar()],
};

const deployConfig: Configuration = webpackMerge({}, config, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: './',
  },
  optimization: {
    ...optimization,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'stylesheet/[name].[contenthash:8].css',
      chunkFilename: 'stylesheet/[id].[contenthash:8].css',
    }),
  ],
});

const devConfig: Configuration = webpackMerge({}, deployConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  optimization: {
    minimize: false,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

const umdConfig: Configuration = webpackMerge({}, config, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    libraryTarget: 'umd',
    filename: '[name].js',
  },
  externals: {
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
  },
});

const umdUglyConfig: Configuration = webpackMerge({}, umdConfig, {
  mode: 'production',
  output: {
    filename: '[name].min.js',
  },
  optimization,
});

const umdZipConfig: Configuration = webpackMerge({}, umdConfig, {
  mode: 'production',
  optimization,
});

type WebpackConfigType = 'umd' | 'umd-ugly' | 'umd-zip' | 'dev' | 'deploy';

const getWebpackConfig = (type?: WebpackConfigType): Configuration => {
  switch (type) {
    case 'umd':
      umdConfig.plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }),
      );
      return umdConfig;

    case 'umd-ugly':
      umdUglyConfig.plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].min.css',
        }),
      );
      return umdUglyConfig;

    case 'umd-zip':
      umdZipConfig.plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }),
      );
      return umdZipConfig;

    case 'dev':
      devConfig.output.publicPath = '/';
      devConfig.module.rules[0].use[0].options.plugins.push(require.resolve('react-refresh/babel'));
      devConfig.plugins.push(new ReactRefreshPlugin());
      return devConfig;

    case 'deploy':
      return deployConfig;

    default:
      return devConfig;
  }
};

export default getWebpackConfig;
