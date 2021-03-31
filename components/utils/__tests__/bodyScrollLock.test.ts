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
      ontouchmove(touchmoveEvent);
      expect(touchmoveEvent.stopPropagation).toBeCalledTimes(2);
      expect(eventsOnSpy).toBeCalledWith(document, 'touchmove', expect.any(Function));
      expect(eventsOnSpy).toBeCalledTimes(1);
    });

    it('should return false when handle scroll if event.target exists and allowTouchMove returns true', () => {
      mockPlatform('iPhone');
      const { lockBodyScroll } = require('../bodyScrollLock');
      const div = document.createElement('div');
      const { targetElement, getTouchEventHandlers } = getProxyTargetElement(div);
      const options = { allowTouchMove: jest.fn().mockReturnValue(true) };
      lockBodyScroll(targetElement, options);
      const { ontouchstart, ontouchmove } = getTouchEventHandlers();
      const touchstartEvent = new TouchEvent('touchstart', {
        targetTouches: [{ clientY: 100 }] as Touch[],
      });
      ontouchstart(touchstartEvent);
      const touchmoveEvent = ({
        target: {},
        stopPropagation: jest.fn(),
        targetTouches: [{ clientY: 200 }] as Touch[],
      } as unknown) as TouchEvent;
      ontouchmove(touchmoveEvent);
      expect(touchmoveEvent.stopPropagation).not.toBeCalled();
      expect(options.allowTouchMove).toBeCalledWith(touchmoveEvent.target);
    });

    it('should return true if targetElement.scrollTop is 0 and clientY > 0', () => {
      mockPlatform('iPhone');
      const { lockBodyScroll } = require('../bodyScrollLock');
      const div = document.createElement('div');
      const { targetElement, getTouchEventHandlers } = getProxyTargetElement(div);
      const options = { allowTouchMove: jest.fn().mockReturnValue(false) };
      lockBodyScroll(targetElement, options);
      const { ontouchstart, ontouchmove } = getTouchEventHandlers();
      const touchstartEvent = new TouchEvent('touchstart', {
        targetTouches: [{ clientY: 100 }] as Touch[],
      });
      ontouchstart(touchstartEvent);
      const touchmoveEvent = ({
        preventDefault: jest.fn(),
        touches: [],
        stopPropagation: jest.fn(),
        targetTouches: [{ clientY: 200 }] as Touch[],
      } as unknown) as TouchEvent;
      ontouchmove(touchmoveEvent);
      expect(touchmoveEvent.stopPropagation).not.toBeCalled();
      expect(options.allowTouchMove).not.toBeCalled();
      expect(touchmoveEvent.preventDefault).toBeCalledTimes(1);
    });

    it('should return true if lock.options.allowTouchMove return false', () => {
      mockPlatform('iPhone');
      const { lockBodyScroll } = require('../bodyScrollLock');
      const div = document.createElement('div');
      const { targetElement, getTouchEventHandlers } = getProxyTargetElement(div);
      const options = {
        allowTouchMove: jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true),
      };
      lockBodyScroll(targetElement, options);
      const { ontouchstart, ontouchmove } = getTouchEventHandlers();
      const touchstartEvent = new TouchEvent('touchstart', {
        targetTouches: [{ clientY: 100 }] as Touch[],
      });
      ontouchstart(touchstartEvent);
      const touchmoveEvent = ({
        target: {},
        preventDefault: jest.fn(),
        touches: [],
        stopPropagation: jest.fn(),
        targetTouches: [{ clientY: 200 }] as Touch[],
      } as unknown) as TouchEvent;
      ontouchmove(touchmoveEvent);
      expect(touchmoveEvent.stopPropagation).not.toBeCalled();
      expect(options.allowTouchMove).toBeCalled();
      expect(touchmoveEvent.preventDefault).not.toBeCalled();
    });

    it('should return true if target element is totally scrolled and clientY < 0', () => {
      mockPlatform('iPhone');
      const { lockBodyScroll } = require('../bodyScrollLock');
      const div = document.createElement('div');
      Object.defineProperty(div, 'scrollHeight', { value: 100 });
      div.scrollTop = 50;
      Object.defineProperty(div, 'clientHeight', { value: 200 });
      const { targetElement, getTouchEventHandlers } = getProxyTargetElement(div);
      const options = { allowTouchMove: jest.fn().mockReturnValue(false) };
      lockBodyScroll(targetElement, options);
      const { ontouchstart, ontouchmove } = getTouchEventHandlers();
      const touchstartEvent = new TouchEvent('touchstart', {
        targetTouches: [{ clientY: 100 }] as Touch[],
      });
      ontouchstart(touchstartEvent);
      const touchmoveEvent = ({
        preventDefault: jest.fn(),
        touches: [],
        stopPropagation: jest.fn(),
        targetTouches: [{ clientY: 50 }] as Touch[],
      } as unknown) as TouchEvent;
      ontouchmove(touchmoveEvent);
      expect(touchmoveEvent.stopPropagation).not.toBeCalled();
      expect(options.allowTouchMove).not.toBeCalled();
      expect(touchmoveEvent.preventDefault).toBeCalledTimes(1);
    });

    it('should return true if target element is totally scrolled and clientY < 0', () => {
      mockPlatform('iPhone');
      const { lockBodyScroll } = require('../bodyScrollLock');
      const div = document.createElement('div');
      const { targetElement, getTouchEventHandlers } = getProxyTargetElement(div);
      const options = { allowTouchMove: jest.fn().mockReturnValue(false) };
      lockBodyScroll(targetElement, options);
      const { ontouchstart, ontouchmove } = getTouchEventHandlers();
      const touchstartEvent = new TouchEvent('touchstart', {
        targetTouches: [{ clientY: 100 }] as Touch[],
      });
      ontouchstart(touchstartEvent);
      const touchmoveEvent = ({
        touches: [],
        target: {},
        stopPropagation: jest.fn(),
        targetTouches: [{ clientY: 200 }] as Touch[],
      } as unknown) as TouchEvent;
      ontouchmove(touchmoveEvent);
      expect(touchmoveEvent.stopPropagation).not.toBeCalled();
      expect(options.allowTouchMove).toBeCalledWith(touchmoveEvent.target);
    });
  });

  describe('#clearAllBodyScrollLocks', () => {
    describe('non-ios platform', () => {
      beforeEach(() => {
        jest.useFakeTimers();
        mockPlatform('android');
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '100px';
        const { lockBodyScroll } = require('../bodyScrollLock');
        lockBodyScroll(null, { reserveScrollBarGap: true });
        jest.advanceTimersByTime(0);
      });
      it('should restore overflow settings for non-ios platform', () => {
        const { clearAllBodyScrollLocks } = require('../bodyScrollLock');
        expect(document.body.style.overflow).toEqual('hidden');
        expect(document.body.style.paddingRight).toEqual('1024px');
        clearAllBodyScrollLocks();
        jest.advanceTimersByTime(0);
        expect(document.body.style.overflow).toEqual('auto');
        expect(document.body.style.paddingRight).toEqual('100px');
      });
    });

    describe('ios platform', () => {
      beforeEach(() => {
        mockPlatform('iPhone');
        const { lockBodyScroll } = require('../bodyScrollLock');
        const div = document.createElement('div');
        lockBodyScroll(div);
      });
      it('should remove event listener for document', () => {
        const eventsOffSpy = jest.spyOn(events, 'off').mockImplementation();
        const { clearAllBodyScrollLocks } = require('../bodyScrollLock');
        clearAllBodyScrollLocks();
        expect(eventsOffSpy).toBeCalledWith(document, 'touchmove', expect.any(Function));
      });
    });
  });

  describe('#unlockBodyScroll', () => {
    describe('non-ios platform', () => {
      const div = document.createElement('div');
      beforeEach(() => {
        mockPlatform('android');
        jest.useFakeTimers();
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '100px';
        const { lockBodyScroll } = require('../bodyScrollLock');
        lockBodyScroll(div, { reserveScrollBarGap: true });
        jest.advanceTimersByTime(0);
      });
      it('should restore overflow settings', () => {
        expect(document.body.style.overflow).toEqual('hidden');
        expect(document.body.style.paddingRight).toEqual('1024px');
        const { unlockBodyScroll } = require('../bodyScrollLock');
        unlockBodyScroll(div);
        jest.advanceTimersByTime(0);
        expect(document.body.style.overflow).toEqual('auto');
        expect(document.body.style.paddingRight).toEqual('100px');
      });
    });

    describe('ios platform', () => {
      const div = document.createElement('div');
      beforeEach(() => {
        mockPlatform('iPhone');
        const { lockBodyScroll } = require('../bodyScrollLock');
        lockBodyScroll(div, { reserveScrollBarGap: true });
      });
      it('should print error if target element does not exist', () => {
        const errorLogSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => 'Suppress');
        const { unlockBodyScroll } = require('../bodyScrollLock');
        unlockBodyScroll();
        expect(errorLogSpy).toBeCalledWith(
          'unlockBodyScroll unsuccessful - targetElement must be provided when calling unlockBodyScroll on IOS devices.',
        );
      });

      it('should remove touchmove event handler for document', () => {
        const eventsOffSpy = jest.spyOn(events, 'off').mockImplementation();
        const { unlockBodyScroll } = require('../bodyScrollLock');
        unlockBodyScroll(div);
        expect(eventsOffSpy).toBeCalledWith(document, 'touchmove', expect.any(Function));
      });
    });
  });
});
