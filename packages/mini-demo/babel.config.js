// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }]
  ],
  plugins: [['import', {
    libraryName: 'zarm',
    customName: (name) => {

      return `zarm/src/${name}/index.mini.ts`;
    },
    customStyleName: (name) => {
      return `zarm/src/${name}/style/index.tsx`;
    }
  }]]
};
