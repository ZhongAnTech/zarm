import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent, screen, createEvent } from '@testing-library/react';
import useLongPress from '..';

describe('useLongPress', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  test('should execute the onLongPress function after triggering the mouse down event and delaying for a period of time ', () => {
    const mOnLongPress = jest.fn();
    const { result } = renderHook(() => useLongPress({ onLongPress: mOnLongPress, delay: 3000 }));
    const mEvent = new MouseEvent('mousedown') as any;
    result.current.onMouseDown(mEvent);
    expect(mOnLongPress).not.toBeCalledWith(mEvent);
    jest.advanceTimersByTime(3000);
    expect(mOnLongPress).toBeCalledWith(mEvent);
  });

  test('should execute the onPress function after triggering the mouse down event immediately', () => {
    const mOnPress = jest.fn();
    const { result } = renderHook(() => useLongPress({ onPress: mOnPress, delay: 3000 }));
    const mEvent = new MouseEvent('mousedown') as any;
    result.current.onMouseDown(mEvent);
    expect(mOnPress).toBeCalledWith(mEvent);
  });

  test('should prevent default behavior of the touchend event for preventing the ghost click', () => {
    const Wrapper = () => {
      const longPress = useLongPress({});
      return (
        <button data-testid="test" {...longPress}>
          click me
        </button>
      );
    };
    render(<Wrapper />);
    const button = screen.getByTestId('test');
    fireEvent.touchStart(button);
    const touchendEvent = createEvent.touchEnd(button);
    fireEvent(button, touchendEvent);
    expect(touchendEvent.defaultPrevented).toBeTruthy();
  });

  test.each`
    eventType         | expected
    ${'onMouseUp'}    | ${new MouseEvent('mouseup')}
    ${'onMouseLeave'} | ${new MouseEvent('mouseleave')}
    ${'onTouchEnd'}   | ${new MouseEvent('touchend')}
  `(
    'should execute the clear function after triggering the $eventType event',
    ({ eventType, expected }) => {
      const mOnClear = jest.fn();
      const { result } = renderHook(() => useLongPress({ onClear: mOnClear }));
      result.current[eventType](expected);
      expect(mOnClear).toBeCalledWith(expected);
    },
  );

  test('should not execute the onPressLong function if the mouseleave event is triggered within the delay window time', () => {
    const mOnLongPress = jest.fn();
    const { result } = renderHook(() => useLongPress({ onLongPress: mOnLongPress, delay: 3000 }));
    const mEvent = new MouseEvent('mousedown') as any;
    result.current.onMouseDown(mEvent);
    expect(mOnLongPress).not.toBeCalledWith(mEvent);
    jest.advanceTimersByTime(2000);
    result.current.onMouseLeave(new MouseEvent('mouseleave'));
    jest.advanceTimersByTime(1000);
    expect(mOnLongPress).not.toBeCalledWith(mEvent);
  });
});
