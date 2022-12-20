module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  overrides: [{ files: '.prettierrc', options: { parser: 'json' } }],
  plugins: [
    require.resolve('prettier-plugin-packagejson'),
    require.resolve('prettier-plugin-organize-imports'),
  ],
};
