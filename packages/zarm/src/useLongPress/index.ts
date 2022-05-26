import { useCallback, useRef } from 'react';
import type { MouseEvent, TouchEvent } from 'react';
import Events from '../utils/events';
import { useLatest } from '../utils/hooks';

type TouchOrMouseEvent = TouchEvent | MouseEvent;

export interface UseLongPressProps {
  isPreventDefault?: boolean;
  delay?: number;
  onLongPress?: (event: TouchOrMouseEvent) => void;
  onPress?: (event: TouchOrMouseEvent) => void;
  onClear?: (event: TouchOrMouseEvent) => void;
}

const isTouchEvent = (ev: TouchOrMouseEvent | Event): ev is TouchEvent => {
  return 'touches' in ev;
};

const preventDefault = (ev: TouchOrMouseEvent | Event) => {
  if (!isTouchEvent(ev)) return;

  if (ev.touches.length < 2 && ev.preventDefault) {
    ev.preventDefault();
  }
};

const useLongPress = ({
  isPreventDefault = true,
  delay = 300,
  ...restProps
}: UseLongPressProps) => {
  const { onLongPress, onPress, onClear } = restProps;

  const timeout = useRef(0);
  const target = useRef<EventTarget>();
  const onLongPressRef = useLatest(onLongPress);
  const onPressRef = useLatest(onPress);
  const onClearRef = useLatest(onClear);

  const start = useCallback(
    (event: MouseEvent | TouchEvent) => {
      // prevent ghost click on mobile devices
      if (isPreventDefault && event.target instanceof Element) {
        Events.on(event.target, 'touchend', preventDefault, { passive: false });
        target.current = event.target;
      }

      if (typeof onPressRef.current === 'function') {
        onPressRef.current(event);
      }

      if (typeof onLongPressRef.current === 'function') {
        timeout.current = window.setTimeout(() => onLongPressRef.current!(event), delay);
      }
    },
    [delay, isPreventDefault],
  );

  const clear = useCallback(
    (event) => {
      // clearTimeout and removeEventListener
      timeout.current && window.clearTimeout(timeout.current);
      if (typeof onClearRef.current === 'function') {
        onClearRef.current(event);
      }

      if (isPreventDefault && target.current instanceof Element) {
        Events.off(target.current, 'touchend', preventDefault);
      }
    },
    [isPreventDefault],
  );

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
  } as const;
};

export default useLongPress;
