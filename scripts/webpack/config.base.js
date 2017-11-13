const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const browsers = require('../config/browsers');

module.exports = {

  output: {
    path: path.resolve(__dirname, '../../assets'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    modules: false,
                    targets: {
                      browsers,
                    },
                  },
                ],
                'react',
                'stage-0',
              ],
              plugins: [
                'transform-runtime',
                ['import', {
                  libraryName: 'zarm',
                  libraryDirectory: 'components',
                  style: true,
                  camel2DashComponentName: false,
                }],
              ],
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    modules: false,
                    targets: {
                      browsers,
                    },
                  },
                ],
                'react',
                'stage-0',
              ],
              plugins: [
                'transform-runtime',
              ],
            },
          },
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader?importLoaders=1',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')({
                    browsers,
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                outputStyle: 'compact',
              },
            },
          ],
        }),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]',
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader?name=fonts/[name].[hash:8].[ext]',
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [' ', '.js', '.jsx', '.ts', '.tsx', '.scss'],
  },

  plugins: [],
};
