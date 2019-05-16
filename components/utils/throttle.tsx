const throttle = (func, delay) => {
  let timer: number;
  let startTime = Date.now();

  return (...args: any[]) => {
    const curTime = Date.now();
    const remaining = delay - (curTime - startTime);
    const context = this;  // eslint-disable-line

    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  };
};

export default throttle;
