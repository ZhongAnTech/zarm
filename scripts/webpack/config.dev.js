const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const config = require('./config.deploy');

config.mode = 'development';
config.devtool = 'cheap-module-eval-source-map';
config.output.filename = 'js/[name].js';
config.output.publicPath = '/';
config.optimization.minimize = false;
config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new ForkTsCheckerWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './site/demo/index_umd.html',
    filename: 'demo_umd.html',
    inject: false,
  }),
);

// hot-loader
Object.keys(config.entry).forEach((key) => {
  config.entry[key].unshift('react-hot-loader/patch');
});
config.module.rules[0].use[0].options.plugins.push('react-hot-loader/babel');


const svgrSetting = {
  test: /\.svg$/,
  use: ['@svgr/webpack'],
};
config.module.rules.splice(1, 0, svgrSetting);

for (let i = 0; i < config.module.rules.length; i += 1) {
  const item = config.module.rules[i];
  console.log(item);
  console.log('--------------');
}

// dev-server
config.devServer = {
  host: '0.0.0.0',
  port: 3000,
  compress: true,
  noInfo: true,
  inline: true,
  hot: true,
  progress: true,
};

module.exports = config;
