module.exports = {
  rootDir: process.cwd(),
  roots: [
    '<rootDir>/components',
  ],
  setupFiles: [
    require.resolve('./environment.js'),
  ],
  setupTestFrameworkScriptFile: require.resolve('./setup.js'),
  testRegex: '/__tests__/.*(\\.jsx|[^d]\\.ts)$',
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    '!components/*/*.native.{ts,tsx}',
    '!components/*/PropsType.{ts,tsx}',
    '!components/**/style/*.{ts,tsx}',
  ],
  transform: {
    '^.+\\.jsx?$': require.resolve('./preprocessor'),
    '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
};
