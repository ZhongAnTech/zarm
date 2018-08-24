const transformPackages = [
  'react-native',
  'react-native-camera-roll-picker',
];

module.exports = {
  preset: 'react-native',
  rootDir: process.cwd(),
  transform: {
    '^.+\\.jsx?$': require.resolve('./preprocessor.native'),
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: [
    require.resolve('./setup.js'),
  ],
  testRegex: '/__tests__/.*(\\.native\\.test\\.jsx|[^d]\\.ts)$',
  collectCoverageFrom: [
    'components/**/*.native.{ts,tsx}',
    '!components/*/PropsType.{ts,tsx}',
    '!components/**/style/*.{ts,tsx}',
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!(${transformPackages.join('|')})/)`,
    // '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
  ],
  testURL: 'http://localhost',
  testEnvironment: 'jsdom',
};
