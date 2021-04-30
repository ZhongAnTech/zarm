import fs from 'fs';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import execa from 'execa';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import getWebpackConfig from './config/webpackConfig';
import { getProjectConfig } from './deploy';
import { getProjectPath } from './utils';

export interface IDevelopmentConfig {
  mode?: 'native';
  host: string;
  port: number;
}

export default async ({ mode, host, port }: IDevelopmentConfig) => {
  if (mode === 'native') {
    const args = [
      require.resolve('@babel/cli/bin/babel'),
      'components',
      '-d',
      'rnkit/zarm',
      '-w',
      '--extensions',
      '.ts,.tsx',
      '--config-file',
      require.resolve('./config/babelConfig/base'),
    ];

    const { stderr, exitCode } = await execa('node', args);

    if (exitCode !== 0) {
      process.stderr.write(stderr);
      process.exit(0);
    }
    return;
  }

  const config = getProjectConfig(getWebpackConfig('dev'));

  if (fs.existsSync(getProjectPath('tsconfig.json'))) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
  }

  const compiler = webpack(config);
  const serverConfig = {
    publicPath: '/',
    compress: true,
    noInfo: true,
    inline: true,
    hot: true,
  };
  const devServer = new WebpackDevServer(compiler, serverConfig);
  devServer.listen(port, host, (err) => {
    if (err) {
      return console.error(err);
    }
    console.warn(`http://${host}:${port}\n`);
  });

  ['SIGINT', 'SIGTERM'].forEach((sig: any) => {
    process.on(sig, () => {
      devServer.close();
      process.exit();
    });
  });
};
