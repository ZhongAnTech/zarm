const { name } = require('./package.json');

module.exports = {
  banner: `
    ${name}

    Github: https://github.com/ZhongAnTech/zarm

    Copyright (c) 2013-present, ZhonganTech, Inc.

    This source code is licensed under the MIT license found in the
    LICENSE file in the root directory of this source tree.
  `,
  setRules: (rules) => {
    rules[1].use.splice(3, 0, {
      loader: require.resolve('resolve-url-loader'),
    });
  },
};
