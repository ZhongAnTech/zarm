var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {

  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'js/[name].min.js',
    chunkFilename: 'js/[name].[chunkhash:8].min.js',
    publicPath: '/'
  },

  module: {
    loaders: [
      { 
        test: /\.scss$/, 
        loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&-minimize!autoprefixer!sass?sourceMap")
      },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&-minimize!autoprefixer")
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(html)$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  
  resolve: {
    extensions: ['', '.js', '.jsx']
  }

};
