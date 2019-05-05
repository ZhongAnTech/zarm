const babelJest = require('babel-jest');
const babelConfig = require('../babel/config.native');

module.exports = babelJest.createTransformer(babelConfig);
