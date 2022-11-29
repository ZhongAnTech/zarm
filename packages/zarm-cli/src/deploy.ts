/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
import webpack, { Configuration, RuleSetRule } from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import SentryCliPlugin from '@sentry/webpack-plugin';
import getWebpackConfig from './config/webpackConfig';
import { getProjectPath, getCustomConfig } from './utils';

const { version } = require(getProjectPath('package.json'));

export interface IDeployConfig {
  outDir: string;
  pushGh: boolean;
  analyzer: boolean;
}

export function getProjectConfig(config: Configuration): Configuration {
  const { entries, setBabelOptions, banner, setRules, setPlugins, ...webpackConfig } =
    getCustomConfig();

  config.entry = {};
  config.plugins = config.plugins || [];
  setBabelOptions && setBabelOptions((config.module.rules[0] as RuleSetRule).use[0].options);
  setRules && setRules(config.module.rules);
  setPlugins && setPlugins(config.plugins);

  Object.keys(entries || {}).forEach((key) => {
    if (entries[key].entry) {
      config.entry[key] = entries[key].entry;
    }
    const htmlWebpackPlugin = new HtmlWebpackPlugin({
      template: entries[key].template,
      filename: `${key}.html`,
      chunks: ['manifest', key],
      favicon: entries[key].favicon,
      inject: entries[key].inject !== false,
    });

    config.plugins.push(htmlWebpackPlugin);
  });

  return webpackMerge(config, webpackConfig);
}

export default ({ outDir, pushGh, analyzer }: IDeployConfig) => {
  const config = getProjectConfig(getWebpackConfig('deploy'));
  config.output.path = getProjectPath(outDir);

  if (pushGh) {
    config.plugins.push(
      new SentryCliPlugin({
        release: version,
        include: outDir,
        sourceMapReference: false,
      }),
    );
  }

  if (analyzer) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true,
      }),
    );
  }

  webpack(config).run(() => {});
};
