import React, { HTMLAttributes, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';
import raf from 'raf';
import Events from '../utils/events';
import type { BasePinchZoomProps } from './interface';
import { ConfigContext } from '../n-config-provider';
import { getElementSize } from '../utils/dom';

interface Point {
  x: number;
  y: number;
}

const getTouches = (touches: TouchList): Array<Point> =>
  Array.from(touches).map((totuch: Touch): Point => ({ x: totuch.pageX, y: totuch.pageY }));

const getDistance = (a: Point, b?: Point): number => {
  if (!b) return 0;
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
};

const calculateScale = (startTouches: Array<Point>, endTouches: Array<Point>): number => {
  const startDistance = getDistance(startTouches[0], startTouches[1]);
  const endDistance = getDistance(endTouches[0], endTouches[1]);

  return endDistance / startDistance;
};

const range = (min: number, max: number, num: number): number => {
  return Math.min(Math.max(num, min), max);
};

const sum = (a: number, b: number): number => a + b;

const getTouchCenter = (point: Array<Point>): Point => ({
  x: point.map(({ x }) => x).reduce(sum, 0) / point.length,
  y: point.map(({ y }) => y).reduce(sum, 0) / point.length,
});

const cancelEvent = (event: any): void => {
  event.stopPropagation();
  if (!Events.supportsPassiveEvents) {
    event.preventDefault();
  }
};

export interface PinchZoomProps extends HTMLAttributes<HTMLDivElement>, BasePinchZoomProps {}

const PinchZoom = React.forwardRef<unknown, PinchZoomProps>((props, ref) => {
  const container = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = `${globalPrefixCls}-pinch-zoom`;

  const { children, className, maxScale, minScale, onPinchZoom, style } = props;

  let currentScale = 1;
  let lastScale = 1;
  let firstMove = false;
  const offset = useRef({
    x: 0,
    y: 0,
  });
  const initOffset = useRef({
    x: 0,
    y: 0,
  });
  let fingers = 0;
  let startTouches;

  let nthZoom = 0;
  let lastScaleCenter: Point | null;
  let lastDragPosition;
  let wheelTimeOut: ReturnType<typeof setTimeout>;
  const rafId = useRef();

  const update = useCallback(() => {
    const updateFrame = () => {
      const x = -offset.current.x / currentScale;
      const y = -offset.current.y / currentScale;
      container?.current?.style.setProperty('--x', `${x}px`);
      container?.current?.style.setProperty('--y', `${y}px`);
      container?.current?.style.setProperty('--scale', currentScale);
      if (typeof onPinchZoom === 'function') {
        onPinchZoom(currentScale, x, y);
      }
    };
    if (rafId) {
      raf.cancel(rafId.current);
    }
    rafId.current = raf(updateFrame);
  }, [currentScale, container, onPinchZoom]);

  useEffect(() => {
    const node = container.current?.firstElementChild;
    const alignCenter = () => {
      initOffset.current = {
        x: 0,
        y: 0,
      };
      const rect = container.current?.getBoundingClientRect();
      const { width, height } = getElementSize(node);
      if (width <= rect?.width) {
        initOffset.current = { x: -(rect?.width - width) / 2, y: 0 };
      }
      if (height <= rect?.height) {
        initOffset.current = { x: initOffset.current.x, y: -(rect?.height - height) / 2 };
      }
      offset.current = initOffset?.current;
      update();
    };
    if (node.nodeName === 'IMG') {
      Events.on(node, 'load', () => {
        alignCenter();
      });
    } else {
      alignCenter();
    }
    alignCenter();
  }, [initOffset, offset, container, update]);

  const calculateOffset = (newOffset: Point) => {
    offset.current = {
      x: offset.current.x + newOffset.x,
      y: offset.current.y + newOffset.y,
    };
  };

  const calculateOffsetBoundary = (currentOffset) => {
    const rect = getElementSize(container.current);
    const { width, height } = getElementSize(container.current?.firstElementChild);
    const elWidth = width * currentScale;
    const elHeight = height * currentScale;
    const maxX = elWidth - rect.width;
    const maxY = elHeight - rect.height;
    const maxOffsetX = Math.max(maxX, 0);
    const maxOffsetY = Math.max(maxY, 0);
    const minOffsetX = Math.min(maxX, 0);
    const minOffsetY = Math.min(maxY, 0);

    return {
      x: range(minOffsetX, maxOffsetX, currentOffset.x),
      y: range(minOffsetY, maxOffsetY, currentOffset.y),
    };
  };

  const doScale = (scale, touchCenter) => {
    const originScale = currentScale;
    currentScale *= scale;
    currentScale = range(minScale! / 2, maxScale!, currentScale);
    const newScale = currentScale / originScale;
    calculateOffset({
      x: (newScale - 1) * (touchCenter.x + offset.current.x),
      y: (newScale - 1) * (touchCenter.y + offset.current.y),
    });
  };

  const getCurrentZoomCenter = () => {
    const { x, y } = offset.current;
    const offsetLeft = x - initOffset.current.x;
    const offsetTop = y - initOffset.current.y;

    return {
      x: -1 * x - offsetLeft / (1 / currentScale - 1),
      y: -1 * y - offsetTop / (1 / currentScale - 1),
    };
  };

  const fixedScale = () => {
    if (currentScale >= 1) {
      return false;
    }
    const center = getCurrentZoomCenter();

    doScale(1 / currentScale, center);
    offset.current = initOffset.current;
  };

  const end = () => {
    fixedScale();
    update();
  };

  const handleZoomEnd = () => {
    end();
  };

  const handleDragEnd = () => {
    end();
  };

  const handleZoomStart = () => {
    lastScale = 1;
    lastScaleCenter = null;
    nthZoom = 0;
  };

  const doDrag = (center, lastCenter) => {
    if (lastCenter) {
      calculateOffset({
        x: -(center.x - lastCenter.x),
        y: -(center.y - lastCenter.y),
      });
    }
  };

  const getTouchesOffset = (touches) => {
    const rect = container.current.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    const posTop = rect.top + scrollTop;
    const posLeft = rect.left + scrollLeft;

    return touches.map((touch) => {
      return {
        x: touch.x - posLeft,
        y: touch.y - posTop,
      };
    });
  };

  const handleZoom = (event, newScale) => {
    const touchCenter = getTouchCenter(getTouchesOffset(getTouches(event.touches)));
    const scale = newScale / lastScale;
    lastScale = newScale;

    nthZoom += 1;
    if (nthZoom > 3) {
      doScale(scale, touchCenter);
      doDrag(touchCenter, lastScaleCenter);
    }
    lastScaleCenter = touchCenter;
  };

  const handleDrag = (event) => {
    const touch = getTouches(event.touches)[0];
    doDrag(touch, lastDragPosition);
    offset.current = calculateOffsetBoundary(offset.current);
    lastDragPosition = touch;
  };

  const handleDragStart = (event) => {
    lastDragPosition = null;
    handleDrag(event);
  };

  const touchStart = (event) => {
    firstMove = true;
    fingers = event.touches.length;
  };

  let interaction = '';
  const setInteraction = (newInteraction, event) => {
    if (interaction !== newInteraction) {
      if (interaction && !newInteraction) {
        switch (interaction) {
          case 'zoom':
            handleZoomEnd();
            break;
          case 'drag':
            handleDragEnd();
            break;
        }
      }

      switch (newInteraction) {
        case 'zoom':
          handleZoomStart();
          break;
        case 'drag':
          handleDragStart(event);
          break;
      }
    }
    interaction = newInteraction;
  };

  const updateInteraction = (event) => {
    if (fingers === 2) {
      setInteraction('zoom', event);
    } else if (fingers === 1 && currentScale !== 1) {
      setInteraction('drag', event);
    } else {
      setInteraction(null, event);
    }
  };

  const touchMove = (event) => {
    if (firstMove) {
      updateInteraction(event);
      if (interaction) {
        cancelEvent(event);
      }
      startTouches = getTouches(event.touches);
    } else {
      switch (interaction) {
        case 'zoom':
          if (startTouches.length === 2 && event.touches.length === 2) {
            handleZoom(event, calculateScale(startTouches, getTouches(event.touches)));
          }
          break;
        case 'drag':
          handleDrag(event);
          break;
      }
      if (interaction) {
        cancelEvent(event);
        update();
      }
    }
    firstMove = false;
  };

  const touchEnd = (event) => {
    fingers = event.touches.length;
    updateInteraction(event);
  };

  const wheel = (event) => {
    let { deltaY } = event;
    const { ctrlKey, deltaMode, pageX, pageY } = event;

    if (deltaMode === 1) {
      deltaY *= 15;
    }

    const divisor = ctrlKey ? 100 : 300;
    doScale(
      1 - deltaY / divisor,
      getTouchesOffset([
        {
          x: pageX,
          y: pageY,
        },
      ])[0],
    );
    update();
    clearTimeout(wheelTimeOut);
    wheelTimeOut = setTimeout(() => {
      end();
    }, 100);
  };

  const cls = classnames(prefixCls, className);

  const child = React.Children.map(children, (element: JSX.Element, index) => {
    return React.cloneElement(element, {
      key: +index,
    });
  });

  return (
    <div
      onTouchStart={touchStart}
      onTouchCancel={touchEnd}
      onTouchEnd={touchEnd}
      onTouchMove={touchMove}
      onWheel={wheel}
      ref={container}
      className={cls}
      style={style}
    >
      {child}
    </div>
  );
});

PinchZoom.defaultProps = {
  minScale: 1,
  maxScale: 3,
};

export default PinchZoom;
