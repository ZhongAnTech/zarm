export default {
  presets: [require.resolve('metro-react-native-babel-preset')],
  plugins: [
    [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
    require.resolve('@babel/plugin-proposal-optional-chaining'),
  ],
};
