// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md

const path = require('path');
const fs = require('fs');

module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: true,
      },
    ],
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'zarm/mini',
        customName: (name) => {
          if (name.startsWith('use')) {
            return `${path.resolve(__dirname, '../', '../packages/zarm/src')}/${name}/index.ts`;
          }
          return `${path.resolve(__dirname, '../', '../packages/zarm/src')}/${name}/index.mini.ts`;
        },
        customStyleName: (name) => {
          if (name.startsWith('use')) {
            return `${path.resolve(
              __dirname,
              '../',
              '../packages/zarm/src',
            )}/${name}/style/index.ts`;
          }
          return `${path.resolve(
            __dirname,
            '../',
            '../packages/zarm/src',
          )}/${name}/style/index.mini.ts`;
        },
      },
    ],
  ],
};
