import { RefObject, useEffect, MouseEvent, TouchEvent } from 'react';
import throttle from 'lodash/throttle';
import Events from '../utils/events';

export interface UseScrollProps {
  container: RefObject<HTMLElement>;
  onScroll?: (event: MouseEvent | TouchEvent) => void;
  wait?: number;
}

const useScroll = ({ container, onScroll, wait = 200 }: UseScrollProps) => {
  useEffect(() => {
    const handler = throttle((event): void => {
      // console.log(`[${Date.now()}] handler`);
      typeof onScroll === 'function' && onScroll(event);
    }, wait);

    if (container.current) {
      Events.on(container.current, 'scroll', handler);
    }

    return () => {
      if (container.current) {
        Events.off(container.current, 'scroll', handler);
      }
    };
  }, [container]);
};

export default useScroll;
