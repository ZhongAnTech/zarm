var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

// var extractCSS = new ExtractTextPlugin('stylesheet/[name].[chunkhash:8].css');

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
        loader: 'style-loader!css?-minimize!autoprefixer?{browsers:["last 2 version", "> 1%", "iOS 7"]}!sass?sourceMap'
        // loader: extractCSS.extract("style", "css?sourceMap&-minimize!autoprefixer!sass?sourceMap")
      },
      { 
        test: /\.css$/,
        loader: 'style-loader!css?sourceMap&-minimize!autoprefixer?{browsers:["last 2 version", "> 1%", "iOS 7"]}'
        // loader: extractCSS.extract("style", "css?sourceMap&-minimize!autoprefixer")
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader?name=fonts/[name].[hash:8].[ext]'
      },
      {
        test: /\.(html)$/,
        loader: 'html'
      }
    ]
  },

  plugins: [
    // extractCSS,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  }

};
