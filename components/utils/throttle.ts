const throttle = (func: Function, delay: number) => {
  let timer: number;
  let startTime = Date.now();

  return (...args: any[]) => {
    const curTime = Date.now();
    const remaining = delay - (curTime - startTime);

    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(this, args);
      startTime = curTime;
    } else {
      timer = window.setTimeout(() => {
        func.apply(this, args);
        startTime = Date.now();
      }, remaining);
    }
  };
};

export default throttle;
