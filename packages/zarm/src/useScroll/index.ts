import { RefObject, useEffect } from 'react';
import throttle from '../utils/throttle';
import Events from '../utils/events';

export interface UseScrollProps {
  container: RefObject<HTMLElement>;
  onScroll?: Function;
  wait?: number;
}

const useScroll = ({ container, onScroll, wait = 200 }: UseScrollProps) => {
  useEffect(() => {
    const handler = throttle((e: MouseEvent | TouchEvent): void => {
      typeof onScroll === 'function' && onScroll(e);
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
