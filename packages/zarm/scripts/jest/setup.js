import '@testing-library/jest-dom';
import React from 'react';

if (Number(React.version.split('.')[0]) >= 19) {
  // React 19 consumers opt into the modern imperative renderer via `zarm/react19`.
  require('../../src/react19');
}

Object.defineProperty(window, 'SVGRect', { value: 'SVGRect', writable: true });

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

window.scrollTo = window.scrollTo || jest.fn();
window.HTMLElement.prototype.scrollTo = jest.fn();
