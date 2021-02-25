module.exports = {
  extends: ['za/react', 'prettier'],
  env: {
    jest: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['za/typescript-react', 'prettier'],
    },
  ],
};
