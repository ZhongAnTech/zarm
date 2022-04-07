const Enzyme = require('enzyme');
require('jest-canvas-mock');

const Adapter =
  process.env.REACT === '16'
    ? require('enzyme-adapter-react-16')
    : require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-native', () => require('dl-react-native-mock-render'), {
  virtual: true,
});

Object.defineProperty(window, 'SVGRect', { value: 'SVGRect', writable: true });
