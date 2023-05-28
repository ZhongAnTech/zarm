import * as path from 'path';
import { defineConfig } from 'dumi';

export default defineConfig({
  mfsu: false,
  crossorigin: {},
  outputPath: 'docs-dist',
  resolve: {
    atomDirs: [{ type: 'component', dir: '../packages/zarm/src' }],
  },
  locales: [
    { id: 'en-US', name: 'English', suffix: '' },
    { id: 'zh-CN', name: '中文', suffix: '-cn' },
  ],
  alias: {
    'zarm/lib': path.resolve(__dirname, '../packages/zarm/src'),
    'zarm/es': path.resolve(__dirname, '../packages/zarm/src'),
    zarm: require.resolve('../packages/zarm/src/index.ts'),
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'zarm',
        libraryDirectory: 'lib',
        style: true,
      },
    ],
  ],
  themeConfig: {
    name: 'zarm',
    logo: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
    autoAlias: {},
    prefersColor: { default: 'auto' },
  },
});
