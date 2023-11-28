import { useSafeState } from 'ahooks';
import { CSSProperties, useRef } from 'react';

const computeStyle = (offsetLeft, animationDuration) => {
  return {
    WebkitTransitionDuration: `${animationDuration}ms`,
    transitionDuration: `${animationDuration}ms`,
    WebkitTransform: `translate3d(${offsetLeft}px, 0, 0)`,
    transform: `translate3d(${offsetLeft}px, 0, 0)`,
  };
};

const useSwipe = ({ animationDuration: duration }) => {
  const isOpen = useRef<null | string>(null);
  const dragging = useRef(false);
  const dragStart = useRef(0);
  const [style, setStyle] = useSafeState<CSSProperties>(computeStyle(0, duration));

  const doTransition = (offsetLeft, animationDuration) => {
    setStyle(computeStyle(offsetLeft, animationDuration));
  };

  const afterClose = () => {
    isOpen.current = null;
    dragStart.current = 0;
  };

  const onSwipe = (
    state,
    {
      leftActions,
      rightActions,
      moveDistanceRatio,
      btnsLeftWidth,
      btnsRightWidth,
      moveTimeSpan,
      animationDuration,
      onOpen,
      close,
    },
  ) => {
    const [offsetX] = state.offset;
    if ((isOpen.current === 'right' && offsetX < 0) || (isOpen.current === 'left' && offsetX > 0)) {
      return false;
    }
    if (state.down) {
      dragging.current = true;
    }
    if (!dragging.current) return;
    dragStart.current = offsetX;

    if (offsetX > 0 && !leftActions) {
      return false;
    }

    if (offsetX < 0 && !rightActions) {
      return false;
    }

    if (state.last) {
      const timeSpan = Math.floor(state.elapsedTime);
      let distanceX = 0;
      let _isOpen = false;

      if (
        btnsLeftWidth > 0 &&
        (offsetX / btnsLeftWidth > moveDistanceRatio! || (offsetX > 0 && timeSpan <= moveTimeSpan!))
      ) {
        distanceX = btnsLeftWidth;
        _isOpen = true;
      } else if (
        (btnsRightWidth > 0 && offsetX / btnsRightWidth < -moveDistanceRatio!) ||
        (offsetX < 0 && timeSpan <= moveTimeSpan!)
      ) {
        distanceX = -btnsRightWidth;
        _isOpen = true;
      }
      doTransition(distanceX, animationDuration);

      if (_isOpen) {
        // 打开
        isOpen.current = distanceX > 0 ? 'left' : 'right';
        onOpen?.();
      } else {
        // 还原
        close();
      }
      window.setTimeout(() => {
        dragging.current = false;
      });
    } else {
      doTransition(offsetX, 0);
    }
  };

  return {
    style,
    doTransition,
    onSwipe,
    isOpen,
    afterClose,
    dragStart,
    dragging,
  };
};

export default useSwipe;
