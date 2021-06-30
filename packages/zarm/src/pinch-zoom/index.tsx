import React, { useRef, HTMLAttributes, useLayoutEffect, useCallback } from 'react';
import classnames from 'classnames';
import type { Point, BasePinchZoomProps } from './interface';
import Events from '../utils/events';

function getDistance(a: Point, b?: Point): number {
  if (!b) return 0;
  return Math.sqrt((b.clientX - a.clientX) ** 2 + (b.clientY - a.clientY) ** 2);
}

function range(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export interface PinchZoomProps extends HTMLAttributes<HTMLDivElement>, BasePinchZoomProps {
  prefixCls?: string;
  className?: string;
}
function PinchZoom(props: PinchZoomProps) {
  const container = useRef<HTMLDivElement | null>(null);

  const { children, className, prefixCls, minScale, maxScale, onPinchZoom } = props;

  let startTouchX = 0;
  let startTouchY = 0;
  let moveX = 0;
  let moveY = 0;
  let startMoveX = 0;
  let startMoveY = 0;
  let deltaX = 0;
  let deltaY = 0;
  let moving = false;
  let zooming = false;
  let scale = 1;
  let startScale: number;
  let prevDistance = 0;
  const originHeight = useRef<Number>();
  const originWidth = useRef<Number>();

  const onload = (event) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const { naturalWidth, naturalHeight } = event.target;
    const windowRatio = windowHeight / windowWidth;
    const imageRatio = naturalHeight / naturalWidth;

    const vertical = imageRatio > windowRatio;

    if (vertical) {
      originWidth.current = windowHeight / imageRatio;
      originHeight.current = windowHeight;
    } else {
      originWidth.current = windowWidth;
      originHeight.current = windowWidth * imageRatio;
    }
  };

  const updateTransform = (currentScale, x, y) => {
    x = currentScale > 1 ? x : 0;
    y = currentScale > 1 ? y : 0;
    container?.current!.style.setProperty('--x', `${x}px`);
    container.current!.style.setProperty('--y', `${y}px`);
    container.current!.style.setProperty('--scale', currentScale);
    if (typeof onPinchZoom === 'function') {
      onPinchZoom(currentScale, x, y);
    }
  };

  const getMaxMoveX = useCallback(() => {
    if (originWidth.current) {
      return Math.max(0, (scale * Number(originWidth.current) - window.innerWidth) / 2);
    }
    return 0;
  }, [originWidth, scale]);

  const getMaxMoveY = useCallback(() => {
    if (originHeight.current) {
      return Math.max(0, (scale * Number(originHeight.current) - window.innerHeight) / 2);
    }
    return 0;
  }, [originHeight, scale]);

  const touchstart = (event) => {
    const { touches } = event;
    startTouchX = touches[0].clientX;
    startTouchY = touches[0].clientY;

    startMoveX = moveX;
    startMoveY = moveY;

    moving = touches.length === 1 && scale !== 1;
    zooming = touches.length === 2;

    if (zooming) {
      startScale = scale;
      prevDistance = getDistance(touches[0], touches[1]);
    }
  };

  const touchmove = (event) => {
    const { touches } = event;
    deltaX = touches[0].clientX - startTouchX;
    deltaY = touches[0].clientY - startTouchY;

    if (moving) {
      const moveH = deltaX + startMoveX;
      const moveV = deltaY + startMoveY;

      const maxMoveX = getMaxMoveX();
      const maxMoveY = getMaxMoveY();
      moveX = range(moveH, -maxMoveX, maxMoveX);
      moveY = range(moveV, -maxMoveY, maxMoveY);
    }

    if (zooming && touches.length === 2) {
      const distance = getDistance(touches[0], touches[1]);
      const currentScale = (startScale * distance) / prevDistance;
      scale = range(minScale, currentScale, maxScale);
    }

    updateTransform(scale, moveX, moveY);

    if (moving || zooming) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const touchEnd = (event) => {
    let stopPropagation = false;
    if (moving || zooming) {
      stopPropagation = true;
      if (moving && startMoveX === moveX && startMoveY === moveY) {
        stopPropagation = false;
      }

      if (!event.touches.length) {
        if (zooming) {
          moveX = range(moveX, -getMaxMoveX(), getMaxMoveX());
          moveY = range(moveY, -getMaxMoveY(), getMaxMoveY());
          zooming = false;
          updateTransform(scale, moveX, moveY);
        }
        moving = false;
        startTouchX = 0;
        startTouchY = 0;
        startScale = 1;
      }
    }
    if (stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useLayoutEffect(() => {
    Events.on(container?.current!, 'touchstart', touchstart);
    Events.on(document.documentElement, 'touchmove', touchmove);
    Events.on(document.documentElement, 'touchend', touchEnd);
    Events.on(document.documentElement, 'touchcancel', touchEnd);

    return () => {
      Events.off(container.current!, 'touchstart', touchstart);
      Events.off(document.documentElement, 'touchmove', touchmove);
      Events.off(document.documentElement, 'touchend', touchEnd);
      Events.off(document.documentElement, 'touchcancel', touchEnd);
      container.current = null;
    };
  }, []);

  const cls = classnames(prefixCls, className);

  const child = React.Children.map(children, (element: JSX.Element, index) => {
    return React.cloneElement(element, {
      key: +index,
      onLoad: onload,
    });
  });
  return (
    <div ref={container} className={cls}>
      {child}
    </div>
  );
}

PinchZoom.defaultProps = {
  prefixCls: 'za-pinch-zoom',
  minScale: 1,
  maxScale: 3,
};

export default PinchZoom;
