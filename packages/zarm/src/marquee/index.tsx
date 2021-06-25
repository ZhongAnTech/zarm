import React, { HTMLAttributes, useCallback, useEffect, useRef } from 'react';
import classnames from 'classnames';
import type { BaseMarqueeProps } from './interface';
import { DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN } from './constants';
import { getKeyFrameModifier, animationModifier } from './modifiers';

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement>, BaseMarqueeProps {
  prefixCls?: string;
}

const CLIENT_RECT = { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 };

function Marquee({
  prefixCls = 'za-marquee',
  direction = 'left',
  loop = true,
  speed = 30,
  animationDelay = 0,
  height,
  style,
  width,
  children,
  className,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollItemRef = useRef<HTMLDivElement | null>(null);

  const containerBoundingRect = useRef<ClientRect>(CLIENT_RECT);
  const boundingRect = useRef<ClientRect>(CLIENT_RECT);

  const cls = classnames(prefixCls, className);
  const dir = direction.toLowerCase();

  const setScrollItemPosition = useCallback(() => {
    const container = containerBoundingRect;
    const rect = boundingRect;
    let modifier = '';

    switch (dir) {
      case DIRECTION_LEFT:
        modifier = `translate3d(${container.current.width}px, 0, 0)`;
        break;
      case DIRECTION_RIGHT:
        modifier = `translate3d(-${rect.current.width}px, 0, 0)`;
        break;
      case DIRECTION_UP:
        modifier = `translate3d(0, ${height}px, 0)`;
        break;
      case DIRECTION_DOWN:
        modifier = `translate3d(0, -${rect.current.height}px ,0)`;
        break;
      default:
        modifier = `translate3d(${rect.current.width}px, 0, 0)`;
    }
    containerRef.current!.style.transform = modifier;
    containerRef.current!.style.webkitTransform = modifier;
  }, [dir, height]);

  const getDistance = useCallback(() => {
    switch (dir) {
      case DIRECTION_LEFT:
        return boundingRect.current.width;
      case DIRECTION_RIGHT:
        return containerBoundingRect.current.width;
      case DIRECTION_UP:
        return boundingRect.current.height;
      case DIRECTION_DOWN:
        return containerBoundingRect.current.height;
      default:
        return boundingRect.current.width;
    }
  }, [dir]);

  const generateKey = useCallback(() => {
    const id = Date.now();
    return `${prefixCls}-${direction}-${id}`.toUpperCase();
  }, [direction, prefixCls]);

  const animationLoop = useCallback(() => {
    const key = generateKey();
    const modifier = getKeyFrameModifier(direction);
    const style = document.createElement('style');
    style.type = 'text/css';
    const distance = getDistance();
    style.innerHTML = modifier(getDistance(), key);
    document.getElementsByTagName('head')[0].appendChild(style);
    const animationDuration = (distance / speed) * 1000;
    const animation = animationModifier(animationDuration, loop, animationDelay, key);
    containerRef.current!.style.animation = animation;
    containerRef.current!.style.webkitTransform = animation;
  }, [animationDelay, speed, direction, generateKey, getDistance, loop]);

  useEffect(() => {
    containerBoundingRect.current = containerRef?.current?.getBoundingClientRect() || CLIENT_RECT;
    boundingRect.current = scrollItemRef?.current?.getBoundingClientRect() || CLIENT_RECT;
    setScrollItemPosition();
    animationLoop();
  }, [animationLoop, direction, loop, setScrollItemPosition]);

  style = style || {};
  style.width = width;
  style!.height = height;

  return (
    <div className={cls} data-speed={speed}>
      <div className={`${prefixCls}__body`} ref={containerRef} style={style}>
        <div className={`${prefixCls}__content`} ref={scrollItemRef}>
          {children}
        </div>
      </div>
    </div>
  );
}

Marquee.displayName = 'Marquee';

export default Marquee;
