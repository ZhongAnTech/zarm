const babelJest = require('babel-jest');

const BROWSERS = [
  'last 3 versions',
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 12.1',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10',
  'and_uc 9.9',
];

module.exports = babelJest.createTransformer({
  presets: [
    [
      'env',
      {
        targets: {
          browsers: BROWSERS,
        },
      },
    ],
    'react',
    'stage-0',
  ],
});
