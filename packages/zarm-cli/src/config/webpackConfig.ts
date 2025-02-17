import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';
import WebpackBar from 'webpackbar';
import babelConfig from './babelConfig/base';

const config: Configuration = {
  stats: 'errors-warnings',

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
              postcssOptions: {
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                ],
              },
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
        test: /\.(png|jpe?g|gif|webp|svg|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]',
        },
      },
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

  plugins: [
    new WebpackBar({}),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};

const deployConfig: Configuration = webpackMerge({}, config, {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: './',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
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
  devtool: 'cheap-module-source-map',
  optimization: {
    minimize: false,
  },
  plugins: [],
  cache: {
    type: 'filesystem',
    name: 'zarm-dev',
    buildDependencies: {
      config: [__filename],
    },
    store: 'pack',
  },
});

const umdConfig: Configuration = webpackMerge({}, config, {
  mode: 'development',
  devtool: 'hidden-source-map',
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
});

type WebpackConfigType = 'umd' | 'umd-ugly' | 'dev' | 'deploy';

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

    case 'dev':
      devConfig.output.publicPath = '/';
      return devConfig;

    case 'deploy':
      return deployConfig;

    default:
      return devConfig;
  }
};

export default getWebpackConfig;
