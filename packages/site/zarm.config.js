const path = require('path');

module.exports = {
  entries: {
    index: {
      entry: ['./web/index.js'],
      template: './web/index.html',
      favicon: './favicon.ico',
    },
    demo: {
      entry: ['./demo/index.js'],
      template: './demo/index.html',
      favicon: './favicon.ico',
    },
    demo_umd: {
      template: './demo/index_umd.html',
      favicon: './favicon.ico',
    },
  },
  resolve: {
    alias: {
      '@': path.join(process.cwd(), '/'),
      '@zarmDir': path.join(process.cwd(), '../zarm'),
      zarm: path.join(process.cwd(), '../zarm/src'),
    },
  },
  setBabelOptions: (options) => {
    options.plugins.push(['import', { libraryName: 'zarm-web', style: 'css' }, 'zarm-web']);
    options.plugins.push([
      'prismjs',
      {
        languages: ['javascript', 'typescript', 'jsx', 'tsx', 'css', 'scss', 'markup', 'bash', 'diff'],
        theme: 'default',
        css: true,
      },
    ]);
  },
  setRules: (rules) => {
    rules.push({
      test: /\.md$/,
      use: ['raw-loader'],
    });
    rules[1].use.splice(3, 0, {
      loader: require.resolve('resolve-url-loader'),
    });
  },
};
