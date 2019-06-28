module.exports = {
  presets: [
    '@babel/env',
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
