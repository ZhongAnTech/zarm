module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
    }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',

    // plugin-babel-import config
    ['import', { libraryName: 'zarm', libraryDirectory: 'components', style: true }, 'zarm'],
    ['import', { libraryName: 'dragon-ui', style: true }, 'dragon-ui'],

    // '@babel/plugin-transform-runtime',
  ],
};
