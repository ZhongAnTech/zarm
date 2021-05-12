import type { ComponentClass } from 'react';

export function flushMicroTasks() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let oCreateObjectURL: typeof window.URL.createObjectURL;
export function mockCreateObjectURL(mock: jest.Mock) {
  oCreateObjectURL = window.URL.createObjectURL;
  Object.defineProperty(window.URL, 'createObjectURL', { value: mock });
}
export function mockResetCreateObjectURL() {
  window.URL.createObjectURL = oCreateObjectURL;
}

export function spyElementPrototypes(Element, properties) {
  const propNames = Object.keys(properties);
  const originDescriptors = {};

  propNames.forEach((propName) => {
    const originDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, propName);
    originDescriptors[propName] = originDescriptor;

    const spyProp = properties[propName];

    if (typeof spyProp === 'function') {
      // If is a function
      Element.prototype[propName] = function spyFunc(...args) {
        return spyProp.call(this, originDescriptor, ...args);
      };
    } else {
      // Otherwise tread as a property
      Object.defineProperty(Element.prototype, propName, {
        ...spyProp,
        set(value) {
          if (spyProp.set) {
            return spyProp.set.call(this, originDescriptor, value);
          }
          if (originDescriptor && originDescriptor.set) {
            return originDescriptor.set(value);
          }
        },
        get() {
          if (spyProp.get) {
            return spyProp.get.call(this, originDescriptor);
          }
          if (originDescriptor && originDescriptor.get) {
            return originDescriptor.get();
          }
          return null;
        },
      });
    }
  });

  return {
    mockRestore() {
      propNames.forEach((propName) => {
        const originDescriptor = originDescriptors[propName];
        if (typeof originDescriptor === 'function') {
          Element.prototype[propName] = originDescriptor;
        } else {
          Object.defineProperty(Element.prototype, propName, originDescriptor);
        }
      });
    },
  };
}

export function mockRefReturnValueOnce(
  Component: ComponentClass,
  refProp: string,
  method: string,
  value: any,
) {
  const refKey = Symbol(refProp);
  Object.defineProperty(Component.prototype, refProp, {
    get() {
      return this[refKey];
    },
    set(ref) {
      if (ref) {
        jest.spyOn(ref, method).mockReturnValueOnce(value);
      }
      this[refKey] = ref;
    },
    configurable: true,
  });
}
