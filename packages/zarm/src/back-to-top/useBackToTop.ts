import { useEffect, useRef } from 'react';
import Events from '../utils/events';
import throttle from '../utils/throttle';
import { getScrollContainer, getScrollTop, scrollTo as customScrollTop } from '../utils/dom';
import type { ContainerType } from '../utils/dom';

interface backToTop {
  speed?: number;
  container?: ContainerType;
  onScroll?: (scrollPosTop: number) => void;
}

const useBackToTop = (props: backToTop) => {
  const { container, onScroll, speed } = props;
  const mounted = useRef(false);

  const onTriggerScroll = () => {
    if (!mounted) return;
    const scrollContainer = getScrollContainer(container);
    const scrollTop = getScrollTop(scrollContainer);

    if (typeof onScroll === 'function') {
      throttle(onScroll, 250)(scrollTop);
    }
  };

  const bindEvent = () => {
    const scrollContainer = getScrollContainer(container);
    scrollContainer && Events.on(scrollContainer, 'scroll', onTriggerScroll);
  };

  const unBindEvent = () => {
    const scrollContainer = getScrollContainer(container);
    scrollContainer && Events.off(scrollContainer, 'scroll', onTriggerScroll);
  };

  const scrollTo = () => {
    const scrollContainer = getScrollContainer(container);

    const scrollTop = getScrollTop(scrollContainer);
    const x: number = speed!;

    // 速度设置为0或者无穷大时，直接到顶
    if (speed === 0 || speed === Infinity) {
      customScrollTop(scrollContainer, 0, 0, 0);
      return;
    }

    return customScrollTop(scrollContainer, 0, 0, scrollTop / ((x / 10) * 1000));
  };

  useEffect(() => {
    bindEvent();
    mounted.current = true;
    return () => {
      unBindEvent();
      mounted.current = false;
    };
  }, [container]);

  return {
    scrollTo,
  };
};

export default useBackToTop;
