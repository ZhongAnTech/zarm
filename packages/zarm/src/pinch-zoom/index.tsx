import React, { Component } from 'react';
import { Point } from './PropsType';
import Events from '../utils/events';

function getDistance(a: Point, b?: Point): number {
  if (!b) return 0;
  return Math.sqrt((b.clientX - a.clientX) ** 2 + (b.clientY - a.clientY) ** 2);
}

function range(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export interface PinchZoomProps {
  prefixCls?: string;
  className?: string;
  onChange?: Function;
  minScale: number;
  maxScale: number;
}

export default class PinchZoom extends Component<PinchZoomProps, any> {
  static defaultProps = {
    prefixCls: 'za-pinch-zoom',
    minScale: 1,
    maxScale: 3,
  };

  private _container;

  private startTouchX = 0;

  private startTouchY = 0;

  private moveX = 0;

  private moveY = 0;

  private startMoveX = 0;

  private startMoveY = 0;

  private deltaX = 0;

  private deltaY = 0;

  private moving = false;

  private zooming = false;

  private scale = 1;

  private startScale;

  private prevDistance = 0;

  private originHeight;

  private originWidth;

  constructor(props) {
    super(props);
    this._container = React.createRef();
  }

  componentDidMount() {
    Events.on(this._container.current, 'touchstart', this.touchstart);
    Events.on(document.documentElement, 'touchmove', this.touchmove);
    Events.on(document.documentElement, 'touchend', this.touchEnd);
    Events.on(document.documentElement, 'touchcancel', this.touchEnd);
  }

  componentWillUnmount() {
    Events.off(this._container.current, 'touchstart', this.touchstart);
    Events.off(document.documentElement, 'touchmove', this.touchmove);
    Events.off(document.documentElement, 'touchend', this.touchEnd);
    Events.off(document.documentElement, 'touchcancel', this.touchEnd);
  }

  getMaxMoveX = () => {
    if (this.originWidth) {
      return Math.max(0, (this.scale * this.originWidth - window.innerWidth) / 2);
    }
    return 0;
  };

  getMaxMoveY() {
    if (this.originHeight) {
      return Math.max(0, (this.scale * this.originHeight - window.innerHeight) / 2);
    }
    return 0;
  }

  touchstart = (event) => {
    const { touches } = event;
    this.startTouchX = touches[0].clientX;
    this.startTouchY = touches[0].clientY;

    this.startMoveX = this.moveX;
    this.startMoveY = this.moveY;

    this.moving = touches.length === 1 && this.scale !== 1;
    this.zooming = touches.length === 2;

    if (this.zooming) {
      this.startScale = this.scale;
      this.prevDistance = getDistance(touches[0], touches[1]);
    }
  };

  updateTransform = (scale, x, y) => {
    const moveX = scale > 1 ? x : 0;
    const moveY = scale > 1 ? y : 0;

    this._container.current.style.setProperty('--x', `${moveX}px`);
    this._container.current.style.setProperty('--y', `${moveY}px`);
    this._container.current.style.setProperty('--scale', scale);
  };

  touchmove = (event) => {
    const { touches } = event;
    this.deltaX = touches[0].clientX - this.startTouchX;
    this.deltaY = touches[0].clientY - this.startTouchY;

    if (this.moving) {
      const moveX = this.deltaX + this.startMoveX;
      const moveY = this.deltaY + this.startMoveY;

      const maxMoveX = this.getMaxMoveX();
      const maxMoveY = this.getMaxMoveY();
      this.moveX = range(moveX, -maxMoveX, maxMoveX);
      this.moveY = range(moveY, -maxMoveY, maxMoveY);
    }

    const { minScale, maxScale, onChange } = this.props;
    if (this.zooming && touches.length === 2) {
      const distance = getDistance(touches[0], touches[1]);
      const scale = (this.startScale * distance) / this.prevDistance;
      this.scale = range(minScale, scale, maxScale);
    }

    this.updateTransform(this.scale, this.moveX, this.moveY);

    if (typeof onChange === 'function') {
      onChange({
        scale: this.scale,
        x: this.moveX,
        y: this.moveY,
      });
    }
    if (this.moving || this.zooming) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  touchEnd = (event) => {
    let stopPropagation = false;
    if (this.moving || this.zooming) {
      stopPropagation = true;
      if (this.moving && this.startMoveX === this.moveX && this.startMoveY === this.moveY) {
        stopPropagation = false;
      }

      if (!event.touches.length) {
        if (this.zooming) {
          this.moveX = range(this.moveX, -this.getMaxMoveX(), this.getMaxMoveX());
          this.moveY = range(this.moveY, -this.getMaxMoveY(), this.getMaxMoveY());
          this.zooming = false;
          this.updateTransform(this.scale, this.moveX, this.moveY);
        }
        this.moving = false;
        this.startTouchX = 0;
        this.startTouchY = 0;
        this.startScale = 1;
      }
    }
    if (stopPropagation) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  onload = (event) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const { naturalWidth, naturalHeight } = event.target;
    const windowRatio = windowHeight / windowWidth;
    const imageRatio = naturalHeight / naturalWidth;

    const vertical = imageRatio > windowRatio;

    if (vertical) {
      this.originWidth = windowHeight / imageRatio;
      this.originHeight = windowHeight;
    } else {
      this.originWidth = windowWidth;
      this.originHeight = windowWidth * imageRatio;
    }
  };

  render() {
    const { children, className, prefixCls } = this.props;
    const child = React.Children.map(children, (element: JSX.Element, index) => {
      return React.cloneElement(element, {
        key: +index,
        onLoad: this.onload,
      });
    });
    return (
      <div ref={this._container} className={`${className} ${prefixCls}`}>
        {child}
      </div>
    );
  }
}
