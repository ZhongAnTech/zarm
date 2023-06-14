import { defineConfig } from 'dumi';
import * as path from 'path';

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
    ['@tarojs/components$']: '@tarojs/components/lib/react',
    'zarm/lib': path.resolve(__dirname, '../packages/zarm/src'),
    'zarm/es': path.resolve(__dirname, '../packages/zarm/src'),
    // 'zarm/mini': require.resolve('../packages/zarm/src/index.mini.ts'),
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
    name: 'zarm',
    logo: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
    autoAlias: {},
    prefersColor: { default: 'auto' },
  },
});
