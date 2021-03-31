/* eslint-disable @typescript-eslint/no-var-requires */

function mockPlatform(platform: string) {
  Object.defineProperty(window.navigator, 'platform', {
    value: platform,
    configurable: true,
  });
}

function getProxyTargetElement(element: HTMLElement) {
  let ontouchstartRef!: (event: TouchEvent) => void;
  let ontouchmoveRef!: (event: TouchEvent) => void;
  const targetElement = new Proxy(element, {
    set(obj, prop, value) {
      if (prop === 'ontouchstart') {
        ontouchstartRef = value;
      }
      if (prop === 'ontouchmove') {
        ontouchmoveRef = value;
      }
      obj[prop] = value;
      return true;
    },
  });
  return {
    targetElement,
    getTouchEventHandlers() {
      return { ontouchmove: ontouchmoveRef, ontouchstart: ontouchstartRef };
    },
  };
}

describe('bodyScrollLock', () => {
  let events: typeof import('../events').default;
  beforeEach(() => {
    jest.resetModules();
    events = require('../events').default;
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

    it('should not set overflow for document.body again if previousBodyOverflowSetting is already set', () => {
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

    it('should set padding right for document.body', () => {
      jest.useFakeTimers();
      mockPlatform('android');
      const { lockBodyScroll } = require('../bodyScrollLock');
      lockBodyScroll(null, { reserveScrollBarGap: true });
      jest.advanceTimersByTime(0);
      expect(document.body.style.paddingRight).toEqual('1024px');
    });
    it('should not set padding right for document.body if previousBodyPaddingRight is already set', () => {
      jest.useFakeTimers();
      mockPlatform('android');
      const paddingRightSetter = jest.fn();
      const paddingRightKey = Symbol('paddingRight');
      document.body.style.paddingRight = '100px';
      Object.defineProperty(document.body.style, 'paddingRight', {
        get() {
          return this[paddingRightKey] || this.getPropertyValue('paddingRight');
        },
        set(val) {
          paddingRightSetter();
          this[paddingRightKey] = val;
        },
      });
      const { lockBodyScroll } = require('../bodyScrollLock');
      const options = { reserveScrollBarGap: true };
      lockBodyScroll(null, options);
      jest.advanceTimersByTime(0);
      lockBodyScroll(null, options);
      jest.advanceTimersByTime(0);
      expect(paddingRightSetter).toBeCalledTimes(1);
    });

    it('should add and handle touch start and touch move events for target element, stop propagation for touch move event', () => {
      mockPlatform('iPhone');
      const eventsOnSpy = jest.spyOn(events, 'on').mockImplementation();
      const { lockBodyScroll } = require('../bodyScrollLock');
      const div = document.createElement('div');
      div.scrollTop = 100;
      const { targetElement, getTouchEventHandlers } = getProxyTargetElement(div);
      lockBodyScroll(targetElement);
      const { ontouchstart, ontouchmove } = getTouchEventHandlers();
      const touchstartEvent = new TouchEvent('touchstart', {
        targetTouches: [{ clientY: 100 }] as Touch[],
      });
      ontouchstart(touchstartEvent);
      const touchmoveEvent = ({
        stopPropagation: jest.fn(),
        targetTouches: [{ clientY: 200 }] as Touch[],
      } as unknown) as TouchEvent;
      ontouchmove(touchmoveEvent);
      expect(touchmoveEvent.stopPropagation).toBeCalledTimes(1);
      expect(eventsOnSpy).toBeCalledWith(document, 'touchmove', expect.any(Function));
    });
  });
});
