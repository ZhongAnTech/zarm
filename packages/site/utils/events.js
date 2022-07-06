export default {
  on(el, type, callback) {
    if (el.addEventListener) {
      el.addEventListener(type, callback, { passive: false });
    } else {
      el.attachEvent(`on ${type}`, () => {
        callback.call(el);
      });
    }
  },

  off(el, type, callback) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback, { passive: false });
    } else {
      el.detachEvent(`off ${type}`, callback);
    }
  },

  once(el, type, callback) {
    const typeArray = type.split(' ');
    const recursiveFunction = (e) => {
      e.target.removeEventListener(e.type, recursiveFunction, { passive: false });
      return callback(e);
    };

    for (let i = typeArray.length - 1; i >= 0; i -= 1) {
      this.on(el, typeArray[i], recursiveFunction);
    }
  },
};
