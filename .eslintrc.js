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
        'react/sort-comp': 0,
        'react/destructuring-assignment': 0,
        'import/prefer-default-export': 0,
      },
      files: ['*.ts', '*.tsx'],
      extends: ['za/typescript-react', 'prettier'],
    },
  ],
};
