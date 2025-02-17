import execa from 'execa';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import fs from 'fs';
import webpack, { Configuration } from 'webpack';
import WebpackDevServer, { Configuration as DevServerConfiguration } from 'webpack-dev-server';
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

  const config: Configuration = getProjectConfig(getWebpackConfig('dev'));

  if (fs.existsSync(getProjectPath('tsconfig.json'))) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
  }

  const compiler = webpack(config);
  const serverConfig: DevServerConfiguration = {
    compress: true,
    hot: true,
    port,
    host,
    client: {
      logging: 'error',
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  };

  const devServer = new WebpackDevServer(serverConfig, compiler);
  devServer.start();

  ['SIGINT', 'SIGTERM'].forEach((sig: any) => {
    process.on(sig, () => {
      devServer.close();
      process.exit();
    });
  });
};
