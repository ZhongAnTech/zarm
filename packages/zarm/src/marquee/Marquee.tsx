import React, { HTMLAttributes, useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import BaseMarqueeProps from './interface';
import { DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN } from './constants';
import { ConfigContext } from '../n-config-provider';
import { canUseDOM } from '../utils/dom';

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement>, BaseMarqueeProps {
  style?: React.CSSProperties;
  className?: string;
}

const SPEED = 30;
const DEFAULT_RECT = {
  top: 0,
  bottom: 0,
  width: 0,
  height: 0,
  left: 0,
  right: 0,
  x: 0,
  y: 0,
  toJSON: () => {},
};

const CLIENT_RECT = canUseDOM && 'DOMRect' in window ? new window.DOMRect() : DEFAULT_RECT;

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>((props, ref) => {
  const { direction, speed = SPEED, delay, height, width, children, className } = props;
  const dir = direction.toLowerCase();

  const container = useRef<HTMLDivElement | null>(null);
  const scrollItem = useRef<HTMLDivElement | null>(null);
  const containerBoundingRect = useRef<DOMRect>(CLIENT_RECT);
  const boundingRect = useRef<DOMRect>(CLIENT_RECT);

  const marqueeRef = (ref as any) || React.createRef<HTMLDivElement>();
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-marquee`;
  const cls = classnames(prefixCls, className);
  let { style } = props;
  style = style || {};
  style.width = width;
  style!.height = height;

  const setAnimationProperty = useCallback(() => {
    let transformX = 0;
    let transformY = 0;
    let distanceX = 0;
    let distanceY = 0;
    let distance = 0;
    const rect = boundingRect.current;

    switch (dir) {
      case DIRECTION_LEFT:
        transformX = containerBoundingRect.current.width;
        distanceX = -boundingRect.current.width;
        distance = boundingRect.current.width + containerBoundingRect.current.width;
        break;
      case DIRECTION_RIGHT:
        transformX = -rect.width;
        distanceX = containerBoundingRect.current.width;
        distance = boundingRect.current.width + containerBoundingRect.current.width;
        break;
      case DIRECTION_UP:
        transformY = +(height || 0);
        distanceY = -boundingRect.current.height;
        distance = boundingRect.current.height + containerBoundingRect.current.height;
        break;
      case DIRECTION_DOWN:
        transformY = -rect.height;
        distanceY = containerBoundingRect.current.height;
        distance = boundingRect.current.height + containerBoundingRect.current.height;
        break;
      default:
        transformX = rect.width;
        distanceX = boundingRect.current.width;
        distance = boundingRect.current.width + containerBoundingRect.current.width;
    }
    container.current!.style.setProperty('--transform-x', `${transformX}px`);
    container.current!.style.setProperty('--transform-y', `${transformY}px`);
    container.current!.style.setProperty('--distance-x', `${distanceX}px`);
    container.current!.style.setProperty('--distance-y', `${distanceY}px`);

    container.current!.style.animationDelay = `${delay}ms`;
    container.current!.style.animationDuration = `${(distance / speed) * 1000}ms`;
  }, [dir, height, speed, delay]);

  useEffect(() => {
    containerBoundingRect.current = container.current!.getBoundingClientRect();
    boundingRect.current = scrollItem.current!.getBoundingClientRect();
    setAnimationProperty();
  }, [setAnimationProperty]);

  return (
    <div className={cls} ref={marqueeRef}>
      <div className={`${prefixCls}__body`} ref={container} style={style}>
        <div className={`${prefixCls}__content`} ref={scrollItem}>
          {children}
        </div>
      </div>
    </div>
  );
});

Marquee.displayName = 'Marquee';

Marquee.defaultProps = {
  direction: 'left',
  speed: 30,
  delay: 0,
};

export default Marquee;
