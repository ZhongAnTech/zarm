module.exports = {
  rootDir: process.cwd(),
  roots: [
    '<rootDir>/components',
  ],
  setupFiles: [
    require.resolve('./environment.js'),
  ],
  setupTestFrameworkScriptFile: require.resolve('./setup.js'),
  testRegex: '/__tests__/[^.]+\\.test(\\.jsx|[^d]\\.ts)$',
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    '!components/*/*.native.{ts,tsx}',
    '!components/*/PropsType.{ts,tsx}',
    '!components/**/style/*.{ts,tsx}',
    '!components/style/**/*',
  ],
  transform: {
    '^.+\\.jsx?$': require.resolve('./preprocessor'),
    '^.+\\.tsx?$': 'ts-jest',
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
  testURL: 'http://localhost',
};
