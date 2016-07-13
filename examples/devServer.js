var express = require('express');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config.dev');

var app = express();
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

new WebpackDevServer(webpack(config), {
  contentBase: __dirname,
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  historyApiFallback: true
}).listen(3000, function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
});