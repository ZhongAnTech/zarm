import { act, renderHook } from '@testing-library/react-hooks';
import useOrientation from '..';

function mockScreenOrientation(value: Pick<ScreenOrientation, 'angle' | 'type'> | undefined) {
  Object.defineProperty(window.screen, 'orientation', { value, writable: true });
}

function mockOrientation(value: number | undefined) {
  Object.defineProperty(window, 'orientation', { value, writable: true });
}

// The screen orientation values table
// https://www.w3.org/TR/screen-orientation/#dfn-screen-orientation-values-table
describe('useOrientation', () => {
  test('should set angle and type when mounted if window.screen.orientation exists', () => {
    mockScreenOrientation({ angle: 180, type: 'portrait-secondary' });
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toEqual({ angle: 180, type: 'portrait-secondary' });
  });

  test('should set angle and type when mounted if window.orientation exists', () => {
    mockScreenOrientation(undefined);
    mockOrientation(90);
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toEqual({ angle: 90, type: '' });
  });

  test('should use the default angle and type if browser does not support orientation API', () => {
    mockScreenOrientation(undefined);
    mockOrientation(undefined);
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toEqual({ angle: 0, type: 'portrait-primary' });
  });

  test('should use the default angle and type if browser does not support orientation API', () => {
    mockScreenOrientation({ angle: 180, type: 'portrait-secondary' });
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toEqual({ angle: 180, type: 'portrait-secondary' });

    act(() => {
      mockScreenOrientation({ angle: 0, type: 'landscape-primary' });
      window.dispatchEvent(new Event('orientationchange'));
    });
    expect(result.current).toEqual({ angle: 0, type: 'landscape-primary' });
  });
});
