const babelJest = require('babel-jest');
const babelConfig = require('../config/babelConfig');

babelConfig.plugins.push('transform-es2015-modules-commonjs');

module.exports = babelJest.createTransformer(babelConfig);
