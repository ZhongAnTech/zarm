import throttle from '../throttle';

jest.useFakeTimers();

describe('65593662', () => {
  describe('throttle', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('should call function if remaining less than 0', () => {
      const fn = jest.fn();
      const getTimeSpy = jest
        .spyOn(Date, 'now')
        .mockReturnValueOnce(2000)
        .mockReturnValueOnce(4000);
      const throttledFn = throttle(fn, 1000);
      throttledFn('param');
      expect(fn).toBeCalledWith('param');
      expect(getTimeSpy).toBeCalledTimes(2);
    });

    it('should call function if remaining equals 0', () => {
      const fn = jest.fn();
      const getTimeSpy = jest
        .spyOn(Date, 'now')
        .mockReturnValueOnce(2000)
        .mockReturnValueOnce(3000);
      const throttledFn = throttle(fn, 1000);
      throttledFn('param');
      expect(fn).toBeCalledWith('param');
      expect(getTimeSpy).toBeCalledTimes(2);
    });

    it('should not call function if remaining greater than 0', () => {
      const fn = jest.fn();
      const getTimeSpy = jest
        .spyOn(Date, 'now')
        .mockReturnValueOnce(2000)
        .mockReturnValueOnce(2500);
      const throttledFn = throttle(fn, 1000);
      throttledFn('param');
      expect(fn).not.toBeCalled();
      jest.advanceTimersByTime(500);
      expect(fn).toBeCalledWith('param');
      expect(getTimeSpy).toBeCalledTimes(3);
    });
  });
});
