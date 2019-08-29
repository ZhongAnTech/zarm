const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelConfig = require('../babel/config');

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
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     publicPath: '../',
          //   },
          // },
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-flexbugs-fixes'),
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
            loader: 'sass-loader',
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
            loader: 'url-loader?limit=1&name=images/[name].[hash:8].[ext]',
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
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
    ],
  },

  resolve: {
    extensions: [' ', '.ts', '.tsx', '.js', '.jsx', '.scss', '.svg'],
  },

  plugins: [],
};
