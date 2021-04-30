// const { getProjectPath } = require('../../utils');

module.exports = {
  rootDir: process.cwd(),
  roots: ['<rootDir>/src'],
  // setupFilesAfterEnv: [
  //   getProjectPath('scripts/jest/setup.js'),
  // ],
  testRegex: '/__tests__/[^.]+\\.test(\\.(js|jsx|ts|tsx))$',
  transform: {
    '^.+\\.jsx?$': require.resolve('./preprocessor'),
    '^.+\\.tsx?$': require.resolve('ts-jest'),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\](?!zarm).+\\.(js|jsx|ts|tsx)$'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/*/*.native.{ts,tsx}',
    '!src/*/PropsType.{ts,tsx}',
    '!src/**/style/*.{ts,tsx}',
    '!src/style/**/*',
    '!src/**/__tests__/*',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testURL: 'http://localhost',
};
