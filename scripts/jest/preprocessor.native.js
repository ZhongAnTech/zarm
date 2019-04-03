const babelJest = require('babel-jest');
const babelConfig = require('../config/babelConfig.native');

module.exports = babelJest.createTransformer(babelConfig);
