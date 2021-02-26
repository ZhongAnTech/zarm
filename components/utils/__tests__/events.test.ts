/* eslint-disable @typescript-eslint/no-var-requires */
describe('events', () => {
  let events: typeof import('../events').default;
  beforeEach(() => {
    jest.resetModules();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('supportsPassiveEvents', () => {
    it('supportsPassiveEvents: true', () => {
      jest
        .spyOn(window, 'addEventListener')
        .mockImplementationOnce((_, __, options: AddEventListenerOptions) => {
          const { passive } = options;
          console.info(passive);
        });
      events = require('../events').default;
      expect(events.supportsPassiveEvents).toBeTruthy();
    });

    it('supportsPassiveEvents: false', () => {
      jest
        .spyOn(window, 'addEventListener')
        .mockImplementationOnce((_, __, useCapture?: AddEventListenerOptions | Boolean) => {
          Boolean(useCapture);
        });
      events = require('../events').default;
      expect(events.supportsPassiveEvents).toBeFalsy();
    });
  });

  describe('#on', () => {
    it('should call addEventListener if element supports addEventListener method', () => {
      jest
        .spyOn(window, 'addEventListener')
        .mockImplementationOnce((_, __, options: AddEventListenerOptions) => {
          const { passive } = options;
          console.info(passive);
        });
      const button = ({ addEventListener: jest.fn() } as unknown) as Element;
      const callback = jest.fn();
      events = require('../events').default;
      events.on(button, 'click', callback);
      expect(button.addEventListener).toBeCalledWith('click', callback, { passive: false });
    });
    it("should call attachEvent if element does't support addEventListener method", () => {
      const button = ({
        attachEvent: jest.fn().mockImplementationOnce((_, callback) => {
          callback();
        }),
      } as unknown) as Element;
      const callback = jest.fn();
      events = require('../events').default;
      events.on(button, 'click', callback);
      expect(button.attachEvent).toBeCalledWith('onclick', expect.any(Function));
      expect(callback).toBeCalled();
      expect(callback.mock.instances[0]).toEqual(button);
    });
  });
  describe('#off', () => {
    it('should call removeEventListener if element supports removeEventListener method', () => {
      jest
        .spyOn(window, 'addEventListener')
        .mockImplementationOnce((_, __, useCapture?: AddEventListenerOptions | Boolean) => {
          Boolean(useCapture);
        });
      const button = ({ removeEventListener: jest.fn() } as unknown) as Element;
      const callback = jest.fn();
      events = require('../events').default;
      events.off(button, 'click', callback);
      expect(button.removeEventListener).toBeCalledWith('click', callback, false);
    });

    it('should call detachEvent if element does not supports removeEventListener method', () => {
      const button = ({
        detachEvent: jest.fn().mockImplementationOnce((_, callback) => {
          callback();
        }),
      } as unknown) as Element;
      const callback = jest.fn();
      events = require('../events').default;
      events.off(button, 'click', callback);
      expect(button.detachEvent).toBeCalledWith('onclick', callback);
      expect(callback).toBeCalled();
    });
  });

  describe('#once', () => {
    it('should remove existed event handler on event target before binding multiple events', () => {
      jest
        .spyOn(window, 'addEventListener')
        .mockImplementationOnce((_, __, useCapture?: AddEventListenerOptions | Boolean) => {
          Boolean(useCapture);
        });
      const mEvent = ({ type: '', target: { removeEventListener: jest.fn() } } as unknown) as Event;
      const button = ({} as unknown) as Element;
      events = require('../events').default;
      const onSpy = jest.spyOn(events, 'on').mockImplementation((_, type: string, callback) => {
        Object.defineProperty(mEvent, 'type', { value: type });
        callback(mEvent);
      });
      const callback = jest.fn();
      events.once(button, 'click dblclick', callback);
      expect(onSpy).toBeCalledWith(button, 'dblclick', expect.any(Function));
      expect(onSpy).toBeCalledWith(button, 'click', expect.any(Function));
      expect(mEvent.target?.removeEventListener).toBeCalledWith(
        'dblclick',
        expect.any(Function),
        false,
      );
      expect(mEvent.target?.removeEventListener).toBeCalledWith(
        'click',
        expect.any(Function),
        false,
      );
      expect(callback).toBeCalledWith(mEvent);
    });

    it('should call callback after binding multiple events if the events are triggered', () => {
      const mEvent = ({} as unknown) as Event;
      const button = ({} as unknown) as Element;
      events = require('../events').default;
      const onSpy = jest.spyOn(events, 'on').mockImplementation((_, __, callback) => {
        callback(mEvent);
      });
      const callback = jest.fn();
      events.once(button, 'click dblclick', callback);
      expect(onSpy).toBeCalledWith(button, 'click', expect.any(Function));
      expect(onSpy).toBeCalledWith(button, 'dblclick', expect.any(Function));
      expect(callback).toBeCalledWith(mEvent);
    });
  });
});
