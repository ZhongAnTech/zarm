const browsers = require('./browsers');

module.exports = {
  presets: [
    ['env', {
      modules: false,
      targets: {
        browsers,
      },
    }],
    'react',
    'stage-0',
  ],
  plugins: [
    'transform-runtime',
  ],
};
