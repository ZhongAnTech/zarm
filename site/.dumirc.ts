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
    'zarm/lib': path.resolve(__dirname, '../packages/zarm/src'),
    'zarm/es': path.resolve(__dirname, '../packages/zarm/src'),
    zarm: require.resolve('../packages/zarm/src/index.ts'),
    '@tarojs/taro': '@tarojs/taro-h5',
    ['@tarojs/components$']: '@tarojs/components/lib/react',
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
 define: {
    'process.env.TARO_ENV': JSON.stringify('h5'),
    ENABLE_INNER_HTML: JSON.stringify(false),
    ENABLE_ADJACENT_HTML: JSON.stringify(false),
    ENABLE_SIZE_APIS: JSON.stringify(false),
    ENABLE_TEMPLATE_CONTENT: JSON.stringify(false),
    ENABLE_CLONE_NODE: JSON.stringify(false),
    ENABLE_CONTAINS: JSON.stringify(false),
    ENABLE_MUTATION_OBSERVER: JSON.stringify(false),
    DEPRECATED_ADAPTER_COMPONENT: JSON.stringify(false),
 }
});
