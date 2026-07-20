export default {
  presets: [
    [require.resolve('@babel/preset-env'), { loose: true }],
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-typescript'),
  ],
  plugins: [
    require.resolve('@babel/plugin-transform-runtime'),
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
    [require.resolve('@babel/plugin-transform-class-properties'), { loose: true }],
    require.resolve('@babel/plugin-transform-optional-chaining'),
  ],
};
