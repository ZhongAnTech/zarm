const babelJest = require('babel-jest');
const babelConfig = require('../config/babelConfig');

babelConfig.plugins.push('@babel/plugin-transform-modules-commonjs');

module.exports = babelJest.createTransformer(babelConfig);
