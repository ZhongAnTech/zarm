module.exports = {
  extends: ['za/react', 'prettier'],
  parserOptions: {
    babelOptions: {
      plugins: ['@babel/plugin-proposal-class-properties'],
    },
  },
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
