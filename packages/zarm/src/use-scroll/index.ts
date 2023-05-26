import throttle from 'lodash/throttle';
import { MouseEvent, RefObject, TouchEvent, useEffect } from 'react';
import Events from '../utils/events';

export interface UseScrollProps {
  container: RefObject<HTMLElement | Window>;
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
  }, [container.current]);
};

export default useScroll;
