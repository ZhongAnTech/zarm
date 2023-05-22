// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md

const path = require('path');

module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }]
  ],
  plugins: [['import', {
    libraryName: 'zarm/mini',
    customName: (name) => {

      return `${path.resolve(__dirname, '../', '../packages/zarm/src')}/${name}/index.mini.ts`;
    },
    customStyleName: (name) => {
      return `${path.resolve(__dirname, '../', '../packages/zarm/src')}/${name}/style/index.mini.ts`;
      // return `zarm/src/${name}/style/index.tsx`;
    }
  }]]
};
