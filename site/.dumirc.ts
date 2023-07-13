import { defineConfig } from 'dumi';
import * as path from 'path';
import pkg from '../packages/zarm/package.json';

export default defineConfig({
  mfsu: false,
  crossorigin: {},
  outputPath: 'dist',
  resolve: {
    atomDirs: [{ type: 'component', dir: '../packages/zarm/src' }],
  },
  locales: [
    { id: 'zh-CN', name: '中文', suffix: '-cn' },
    { id: 'en-US', name: 'English', suffix: '' },
  ],
  alias: {
    '.dumi': path.resolve('./.dumi'),
    'zarm/lib': path.resolve(__dirname, '../packages/zarm/src'),
    'zarm/es': path.resolve(__dirname, '../packages/zarm/src'),
    zarm: path.resolve(__dirname, '../packages/zarm/src/index.ts'),
    ['@tarojs/components$']: '@tarojs/components/lib/react',
  },
  extraBabelPresets: [require.resolve('@emotion/babel-preset-css-prop')],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'zarm',
        libraryDirectory: 'lib',
        style: true,
      },
      'zarm',
    ],
    [
      'import',
      {
        libraryName: 'zarm/mini',
        customName: (name) => {
          return require.resolve(`../packages/zarm/src/${name}/index.mini.ts`);
        },
        customStyleName: (name) => {
          return require.resolve(`../packages/zarm/src/${name}/style/index.mini.ts`);
        },
      },
      'zarm-mini',
    ],
  ],
  themeConfig: {
    name: 'Zarm Design',
    logo: 'https://zarm.design/images/logo.1a6cfc30.svg',
    version: pkg.version,
    autoAlias: {},
    prefersColor: { default: 'auto' },
  },
});
