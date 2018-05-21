const babelJest = require('babel-jest');
const babelConfig = require('../config/babelConfig');

module.exports = babelJest.createTransformer(babelConfig);
