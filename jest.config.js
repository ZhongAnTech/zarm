module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'enzyme',
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
};
