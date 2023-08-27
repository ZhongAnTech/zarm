import { defineConfig } from 'dumi';
import * as path from 'path';
import pkg from '../packages/zarm/package.json';
import rehype from './.dumi/rehype';
import remark from './.dumi/remark';

export default defineConfig({
  mfsu: false,
  crossorigin: {},
  outputPath: 'dist',
  ssr: process.env.NODE_ENV === 'production' ? {} : false,
  hash: true,
  // apiParser: {},
  resolve: {
    // entryFile: "../packages/zarm/src/index.ts",
    atomDirs: [{ type: 'component', dir: '../packages/zarm/src' }],
    codeBlockMode: 'passive',
  },
  locales: [
    { id: 'en-US', name: 'English', suffix: '' },
    { id: 'zh-CN', name: '中文', suffix: '-cn' },
  ],
  alias: {
    '.dumi': path.resolve('./.dumi'),
    'zarm/lib': path.resolve(__dirname, '../packages/zarm/src'),
    'zarm/es': path.resolve(__dirname, '../packages/zarm/src'),
    zarm: path.resolve(__dirname, '../packages/zarm/src/index.ts'),
    ['@tarojs/components$']: '@tarojs/components/lib/react',
  },
  conventionRoutes: {
    exclude: [new RegExp('components/')],
  },
  extraRehypePlugins: [rehype],
  extraRemarkPlugins: [remark],
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
    nprogress: false,
    version: pkg.version,
    autoAlias: {},
    prefersColor: { default: 'auto' },
    docVersions: {
      '2.x': 'https://2x.zarm.design',
    },
  },
  headScripts: [
    `
    (function () {
      function isLocalStorageNameSupported() {
        const testKey = 'test';
        const storage = window.localStorage;
        try {
          storage.setItem(testKey, '1');
          storage.removeItem(testKey);
          return true;
        } catch (error) {
          return false;
        }
      }
      // 优先级提高到所有静态资源的前面，语言不对，加载其他静态资源没意义
      const pathname = location.pathname;

      function isZhCN(pathname) {
        return /-cn\\/?$/.test(pathname);
      }
      function getLocalizedPathname(path, zhCN) {
        const pathname = path.indexOf('/') === 0 ? path : '/' + path;
        if (!zhCN) {
          // to enUS
          return /\\/?index(-cn)?/.test(pathname) ? '/' : pathname.replace('-cn', '');
        } else if (pathname === '/') {
          return '/index-cn';
        } else if (pathname.indexOf('/') === pathname.length - 1) {
          return pathname.replace(/\\/$/, '-cn/');
        }
        return pathname + '-cn';
      }

      // 兼容旧的 URL， \`?locale=...\`
      const queryString = location.search;
      if (queryString) {
        const isZhCNConfig = queryString.indexOf('zh-CN') > -1;
        if (isZhCNConfig && !isZhCN(pathname)) {
          location.pathname = getLocalizedPathname(pathname, isZhCNConfig);
        }
      }

      if (isLocalStorageNameSupported() && (pathname === '/' || pathname === '/index-cn')) {
        const lang =
          (window.localStorage && localStorage.getItem('locale')) ||
          ((navigator.language || navigator.browserLanguage).toLowerCase() === 'zh-cn'
            ? 'zh-CN'
            : 'en-US');
        // safari is 'zh-cn', while other browser is 'zh-CN';
        if ((lang === 'zh-CN') !== isZhCN(pathname)) {
          location.pathname = getLocalizedPathname(pathname, lang === 'zh-CN');
        }
      }
      document.documentElement.className += isZhCN(pathname) ? 'zh-cn' : 'en-us';
    })();
    `,
  ],
});
