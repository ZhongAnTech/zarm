module.exports = {
  presets: [
    [require.resolve('@babel/preset-env'), { loose: true }],
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-typescript'),
  ],
  plugins: [
    require.resolve('@babel/plugin-transform-runtime'),
    [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
  ],
};
