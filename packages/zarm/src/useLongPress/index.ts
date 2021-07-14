import { useCallback, useRef } from 'react';
import Events from '../utils/events';

export interface UseLongPressProps {
  isPreventDefault?: boolean;
  delay?: number;
  onLongPress?: (event: TouchEvent | MouseEvent) => void;
  onPress?: (event: TouchEvent | MouseEvent) => void;
  onClear?: (event: TouchEvent | MouseEvent) => void;
}

const isTouchEvent = (ev: Event): ev is TouchEvent => {
  return 'touches' in ev;
};

const preventDefault = (ev: Event) => {
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

  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const target = useRef<EventTarget>();

  const start = useCallback(
    (event) => {
      // prevent ghost click on mobile devices
      if (isPreventDefault && event.target) {
        Events.on(event.target as HTMLElement, 'touchend', preventDefault, { passive: false });
        target.current = event.target;
      }

      if (typeof onPress === 'function') {
        onPress(event);
      }

      if (typeof onLongPress === 'function') {
        timeout.current = setTimeout(() => onLongPress!(event), delay);
      }
    },
    [onPress, onLongPress, delay, isPreventDefault],
  );

  const clear = useCallback(
    (event) => {
      // clearTimeout and removeEventListener
      timeout.current && clearTimeout(timeout.current);
      if (typeof onClear === 'function') {
        onClear(event);
      }

      if (isPreventDefault && target.current) {
        Events.off(target.current as HTMLElement, 'touchend', preventDefault);
      }
    },
    [onClear, isPreventDefault],
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
