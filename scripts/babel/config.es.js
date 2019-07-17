module.exports = {
  presets: [
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-object-rest-spread',
  ],
};
