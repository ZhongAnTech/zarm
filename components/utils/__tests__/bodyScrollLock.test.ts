/* eslint-disable @typescript-eslint/no-var-requires */

function mockPlatform(platform: string) {
  Object.defineProperty(window.navigator, 'platform', {
    value: platform,
    configurable: true,
  });
}

describe('bodyScrollLock', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });
  describe('#lockBodyScroll', () => {
    it('should print error if target element is not provided', () => {
      mockPlatform('iPhone');
      const errorSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => 'Suppress');
      const { lockBodyScroll } = require('../bodyScrollLock');
      lockBodyScroll();
      expect(errorSpy).toBeCalledWith(
        'lockBodyScroll unsuccessful - targetElement must be provided when calling lockBodyScroll on IOS devices.',
      );
    });

    it('should set overflow hidden style for document.body', () => {
      mockPlatform('android');
      jest.useFakeTimers();
      const { lockBodyScroll } = require('../bodyScrollLock');
      lockBodyScroll();
      jest.advanceTimersByTime(0);
      expect(document.body.style.overflow).toEqual('hidden');
    });

    it('should not set it again if previousBodyOverflowSetting is already set', () => {
      jest.useFakeTimers();
      mockPlatform('android');
      const overflowSetter = jest.fn();
      const overflowKey = Symbol('overflow');
      document.body.style.overflow = 'auto';
      Object.defineProperty(document.body.style, 'overflow', {
        get() {
          return this[overflowKey] || this.getPropertyValue('overflow');
        },
        set(val) {
          overflowSetter();
          this[overflowKey] = val;
        },
      });
      const { lockBodyScroll } = require('../bodyScrollLock');

      lockBodyScroll();
      jest.advanceTimersByTime(0);
      lockBodyScroll();
      jest.advanceTimersByTime(0);
      expect(overflowSetter).toBeCalledTimes(1);
    });
  });
});
