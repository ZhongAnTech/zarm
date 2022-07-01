import babelJest from 'babel-jest';
import babelConfig from '../babelConfig/base';

module.exports = babelJest.createTransformer(babelConfig);
