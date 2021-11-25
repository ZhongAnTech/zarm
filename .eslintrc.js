module.exports = {
  extends: ['za/react', 'prettier'],
  env: {
    jest: true,
  },
  overrides: [
    {
      rules: {
        'react-hooks/exhaustive-deps': 0,
      },
      files: ['*.ts', '*.tsx'],
      extends: ['za/typescript-react', 'prettier'],
    },
  ],
};
