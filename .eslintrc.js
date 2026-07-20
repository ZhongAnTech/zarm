module.exports = {
  extends: ['za/react', 'prettier'],
  parserOptions: {
    babelOptions: {
      plugins: ['@babel/plugin-transform-class-properties'],
    },
  },
  env: {
    jest: true,
  },
  settings: {
    react: {
      version: '19.2.7',
    },
  },
  rules: {
    'import/order': 0,
    'react/jsx-no-bind': 0,
    'react/require-default-props': 0,
  },
  overrides: [
    {
      rules: {
        'react/jsx-no-bind': 0,
        'react/require-default-props': 0,
        'react-hooks/exhaustive-deps': 0,
        'react/sort-comp': 0,
        'react/destructuring-assignment': 0,
        'import/prefer-default-export': 0,
        '@typescript-eslint/consistent-type-assertions': 0,
      },
      files: ['*.ts', '*.tsx'],
      extends: ['za/typescript-react', 'prettier'],
      settings: {
        react: {
          version: '19.2.7',
        },
      },
    },
  ],
};
