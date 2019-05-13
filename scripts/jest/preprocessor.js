const babelJest = require('babel-jest');
const babelConfig = require('../babel/config');

babelConfig.plugins.push('@babel/plugin-transform-modules-commonjs');

module.exports = babelJest.createTransformer(babelConfig);
