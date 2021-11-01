import babelJest from 'babel-jest';
import babelConfig from '../babelConfig/native';

module.exports = babelJest.createTransformer(babelConfig);
