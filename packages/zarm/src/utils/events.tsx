/* eslint-disable @typescript-eslint/no-empty-interface */
import noop from '../utils/noop';

let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: () => {
      supportsPassive = true;
      return true;
    },
  });
  window.addEventListener('test', noop, opts);
  // eslint-disable-next-line no-empty
} catch (e) {}

interface IEEvent {
  attachEvent(event: string, listener: EventListener): boolean;
  detachEvent(event: string, listener: EventListener): void;
}

declare global {
  interface Element extends IEEvent {}
  interface Window extends IEEvent {}
  interface Document extends IEEvent {}
}

export default {
  supportsPassiveEvents: supportsPassive,
  on(
    el: Element | Window | Document,
    type: string,
    callback: EventListener,
    options: AddEventListenerOptions | boolean = { passive: false },
  ) {
    if (el.addEventListener) {
      el.addEventListener(type, callback, supportsPassive ? options : false);
    } else {
      el.attachEvent(`on${type}`, () => {
        callback.call(el);
      });
    }
  },

  off(
    el: Element | Window | Document,
    type: string,
    callback: EventListener,
    options: AddEventListenerOptions | boolean = { passive: false },
  ) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback, supportsPassive ? options : false);
    } else {
      el.detachEvent(`on${type}`, callback);
    }
  },

  once(
    el: Element,
    type: string,
    callback: EventListener,
    options: AddEventListenerOptions | boolean = { passive: false },
  ) {
    const typeArray = type.split(' ');
    const recursiveFunction = (e: Event) => {
      if (e.target) {
        e.target.removeEventListener(e.type, recursiveFunction, supportsPassive ? options : false);
      }
      return callback(e);
    };

    for (let i = typeArray.length - 1; i >= 0; i -= 1) {
      this.on(el, typeArray[i], recursiveFunction);
    }
  },
};
