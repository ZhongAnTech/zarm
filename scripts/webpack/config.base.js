const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const browserlist = require('../config/browserlist');
const babelConfig = require('../config/babelConfig');

babelConfig.plugins.push([
  'import',
  {
    libraryName: 'zarm',
    libraryDirectory: 'components',
    style: true,
  },
]);

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
            options: babelConfig,
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader?importLoaders=1',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: browserlist,
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
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
    ],
  },

  resolve: {
    extensions: [' ', '.ts', '.tsx', '.js', '.jsx', '.scss'],
  },

  plugins: [],
};
