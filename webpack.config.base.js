var webpack = require('webpack');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {

  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/'
  },

  module: {
    loaders: [
      { 
        test: /\.scss$/,
        loader: 'style-loader!css?sourceMap&-minimize!autoprefixer!sass?sourceMap'
        // loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&-minimize!autoprefixer!sass?sourceMap")
      },
      { 
        test: /\.css$/,
        loader: 'style-loader!css?sourceMap&-minimize!autoprefixer'
        // loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&-minimize!autoprefixer")
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
        loader: 'html'
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  }

};
