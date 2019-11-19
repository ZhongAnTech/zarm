let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: () => {
      supportsPassive = true;
      return true;
    },
  });
  window.addEventListener('test', () => {}, opts);
} catch (e) {
  // todo
}

export default {
  on(el, type, callback, options = { passive: false }) {
    if (el.addEventListener) {
      el.addEventListener(type, callback, supportsPassive ? options : false);
    } else {
      el.attachEvent(`on ${type}`, () => {
        callback.call(el);
      });
    }
  },

  off(el, type, callback, options = { passive: false }) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback, supportsPassive ? options : false);
    } else {
      el.detachEvent(`off ${type}`, callback);
    }
  },

  once(el, type, callback, options = { passive: false }) {
    const typeArray = type.split(' ');
    const recursiveFunction = (e) => {
      e.target.removeEventListener(e.type, recursiveFunction, supportsPassive ? options : false);
      return callback(e);
    };

    for (let i = typeArray.length - 1; i >= 0; i -= 1) {
      this.on(el, typeArray[i], recursiveFunction);
    }
  },
};
