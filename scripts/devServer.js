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
  console.log('listening at localhost:3000');
});

// const express = require('express');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const config = require('./webpack.config.dev');

// const compiler = webpack(config);
// const app = express();
// app.use(webpackDevMiddleware(compiler, {
//   hot: true,
//   noInfo: true,
//   publicPath: config.output.publicPath,
// }));
// app.use(webpackHotMiddleware(compiler));
// app.listen(3000, (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('listening at http://localhost:3000');
// });
