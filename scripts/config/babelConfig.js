module.exports = {
  presets: [
    ['env', {
      modules: false,
    }],
    'react',
    'stage-2',
  ],
  plugins: [
    'transform-runtime',
  ],
};
