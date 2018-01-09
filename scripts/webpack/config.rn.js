const path = require('path');

const config = {
  // devtool: 'source-map',

  entry: {
    index: ['./examples-rn/index.js'],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },

  module: {
    rules: [
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
                  },
                ],
                'react',
                'stage-0',
              ],
              // plugins: [
              //   'transform-runtime',
              // ],
            },
          },
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [' ', '.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [],

};

config.output.publicPath = 'http://localhost:8081/';

module.exports = config;
