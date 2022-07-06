const throttle = (func, delay) => {
  let timer;
  let startTime = Date.now();
  return (...args) => {
    const curTime = Date.now();
    const remaining = delay - (curTime - startTime);

    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(this, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  };
};

export default throttle;
