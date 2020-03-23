const path = require('path');
const { name, version } = require('./package.json');

module.exports = {
  entries: {
    index: {
      entry: ['./site/web/index.js'],
      template: './site/web/index.html',
      favicon: './site/favicon.ico',
    },
    demo: {
      entry: ['./site/demo/index.js'],
      template: './site/demo/index.html',
      favicon: './site/favicon.ico',
    },
    demo_umd: {
      template: './site/demo/index_umd.html',
      inject: false,
    },
  },
  resolve: {
    alias: {
      zarm: path.join(process.cwd(), 'components'),
      '@': path.join(process.cwd(), '/'),
      '@site': path.join(process.cwd(), 'site'),
    },
  },
  banner: `
    ${name} v${version}

    Github: https://github.com/ZhongAnTech/${name}

    Copyright (c) 2013-present, ZhonganTech, Inc.

    This source code is licensed under the MIT license found in the
    LICENSE file in the root directory of this source tree.
  `,
  setBabelOptions: (options) => {
    options.plugins.push(['import', { libraryName: 'dragon-ui', style: true }, 'dragon-ui']);
  },
};
