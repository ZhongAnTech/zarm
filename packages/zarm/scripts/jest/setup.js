import '@testing-library/jest-dom';

const Enzyme = require('enzyme');
require('jest-canvas-mock');

const Adapter =
  process.env.REACT === '16'
    ? require('enzyme-adapter-react-16')
    : require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });

Object.defineProperty(window, 'SVGRect', { value: 'SVGRect', writable: true });

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));
