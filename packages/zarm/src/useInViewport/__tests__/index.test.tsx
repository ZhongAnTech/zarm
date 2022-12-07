import { renderHook, act } from '@testing-library/react-hooks';
import useInViewport from '../index';

const targetEl = document.createElement('div');
document.body.appendChild(targetEl);

const mockIntersectionObserver = jest.fn().mockReturnValue({
  observe: () => null,
  disconnect: () => null,
});

window.IntersectionObserver = mockIntersectionObserver;

describe('useInViewport', () => {
  it('should work when target is in viewport', async () => {
    const { result } = renderHook(() => useInViewport(targetEl));
    const { calls } = mockIntersectionObserver.mock;
    const [onChange] = calls[calls.length - 1];

    act(() => {
      onChange([
        {
          targetEl,
          isIntersecting: true,
        },
      ]);
    });

    const [inViewport] = result.current;
    expect(inViewport).toBeTruthy();
  });

  it('should not work when target is null', async () => {
    const observe = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe,
      disconnect: () => null,
    });
    renderHook(() => useInViewport(null));
    expect(observe).toHaveBeenCalledTimes(0);
  });

  it('should disconnect when unmount', async () => {
    const disconnect = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      disconnect,
    });
    const { unmount } = renderHook(() => useInViewport(targetEl));
    unmount();
    expect(disconnect).toBeCalled();
  });
});
