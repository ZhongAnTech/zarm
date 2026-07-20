const pkg = require('./package.json');

module.exports = {
  displayName: {
    name: pkg.name,
    color: 'blue',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': require.resolve('ts-jest/legacy'),
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
  verbose: true,
};
