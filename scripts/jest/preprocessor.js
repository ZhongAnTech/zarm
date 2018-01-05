const babelJest = require('babel-jest');
const browsers = require('../config/browsers');

module.exports = babelJest.createTransformer({
  presets: [
    [
      'env',
      {
        targets: {
          browsers,
        },
      },
    ],
    'react',
    'stage-0',
  ],
});
