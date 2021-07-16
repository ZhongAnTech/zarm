import React, { useRef, HTMLAttributes, useCallback } from 'react';
import classnames from 'classnames';
import type { BasePinchZoomProps } from './interface';
import { ConfigContext } from '../n-config-provider';
import mergerRefs from '../utils/mergeRefs';

interface Point {
  clientX: number;
  clientY: number;
}

function getDistance(a: Point, b?: Point): number {
  if (!b) return 0;
  return Math.sqrt((b.clientX - a.clientX) ** 2 + (b.clientY - a.clientY) ** 2);
}

function range(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export interface PinchZoomProps extends HTMLAttributes<HTMLDivElement>, BasePinchZoomProps {}

const PinchZoom = React.forwardRef<unknown, PinchZoomProps>((props, ref) => {
  const container = useRef<HTMLDivElement | null>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = `${globalPrefixCls}-pinch-zoom`;

  const { children, className, maxScale, onPinchZoom } = props;

  const startTouchX = useRef<number>(0);
  const startTouchY = useRef<number>(0);
  const prevDistance = useRef<number>(0);
  const moveX = useRef<number>(0);
  const moveY = useRef<number>(0);
  const startMoveX = useRef<number>(0);
  const startMoveY = useRef<number>(0);
  const moving = useRef<boolean>(false);
  const zooming = useRef<boolean>(false);
  const scale = useRef<number>(1);
  const startScale = useRef<number>(1);

  const originHeight = useRef<Number>(0);
  const originWidth = useRef<Number>(0);

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
    container?.current!.style.setProperty('--x', `${x}px`);
    container.current!.style.setProperty('--y', `${y}px`);
    container.current!.style.setProperty('--scale', currentScale);
    if (typeof onPinchZoom === 'function') {
      onPinchZoom(currentScale, x, y);
    }
  };

  const getMaxMoveX = useCallback(() => {
    if (originWidth.current) {
      return Math.max(0, (scale.current * Number(originWidth.current) - window.innerWidth) / 2);
    }
    return 0;
  }, [originWidth, scale]);

  const getMaxMoveY = useCallback(() => {
    if (originHeight.current) {
      return Math.max(0, (scale.current * Number(originHeight.current) - window.innerHeight) / 2);
    }
    return 0;
  }, [originHeight, scale]);

  const touchstart = (event) => {
    const { touches } = event;
    startTouchX.current = touches[0].clientX;
    startTouchY.current = touches[0].clientY;

    startMoveX.current = moveX.current;
    startMoveY.current = moveY.current;

    moving.current = touches.length === 1 && scale.current !== 1;
    zooming.current = touches.length === 2;

    if (zooming.current) {
      startScale.current = scale.current;
      prevDistance.current = getDistance(touches[0], touches[1]);
    }
  };

  const touchmove = (event) => {
    const { touches } = event;

    const deltaX = touches[0].clientX - startTouchX.current;
    const deltaY = touches[0].clientY - startTouchY.current;

    if (moving.current) {
      const maxMoveX = getMaxMoveX();
      const maxMoveY = getMaxMoveY();
      moveX.current = range(deltaX + startMoveX.current, -maxMoveX, maxMoveX);
      moveY.current = range(deltaY + startMoveY.current, -maxMoveY, maxMoveY);
      if (scale.current !== 1) {
        updateTransform(scale.current, moveX.current, moveY.current);
      }
    }

    if (zooming.current && touches.length === 2) {
      const distance = getDistance(touches[0], touches[1]);
      const currentScale = (startScale.current * distance) / prevDistance.current;
      scale.current = currentScale > maxScale! ? maxScale! : currentScale;
      updateTransform(scale.current, 0, 0);
    }
  };

  const touchEnd = (event) => {
    let stopPropagation = false;
    if (moving.current || zooming.current) {
      stopPropagation = true;
      if (moving && startMoveX.current === moveX.current && startMoveY.current === moveY.current) {
        stopPropagation = false;
      }

      if (!event.touches.length) {
        if (zooming.current) {
          moveX.current = range(moveX.current, -getMaxMoveX(), getMaxMoveX());
          moveY.current = range(moveY.current, -getMaxMoveY(), getMaxMoveY());
          zooming.current = false;
          // updateTransform(scale.current, moveX.current, moveY.current);
        }
        moving.current = false;
        startTouchX.current = 0;
        startTouchY.current = 0;
        startScale.current = 1;
        if (scale.current < 1) {
          scale.current = 1;
          updateTransform(scale.current, 0, 0);
        }
      }
    }
    if (stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const cls = classnames(prefixCls, className);

  const child = React.Children.map(children, (element: JSX.Element, index) => {
    return React.cloneElement(element, {
      key: +index,
      onLoad: onload,
    });
  });
  return (
    <div
      onTouchStart={touchstart}
      onTouchCancel={touchEnd}
      onTouchEnd={touchEnd}
      onTouchMove={touchmove}
      ref={mergerRefs([container, ref])}
      className={cls}
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
