import '@testing-library/jest-dom';

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
