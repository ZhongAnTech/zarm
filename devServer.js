const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');

new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, 'examples'),
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  noInfo: true,
  historyApiFallback: true,
}).listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
});
