/* istanbul ignore file */
import React, { Component } from 'react';
import PointerTracker, { Pointer } from 'pointer-tracker';
import { Point } from './PropsType';
/* https://github.com/GoogleChromeLabs/pinch-zoom */

let cachedSvg: SVGSVGElement;
function getSVG(): SVGSVGElement {
  if (cachedSvg) {
    return cachedSvg;
  }
  cachedSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  return cachedSvg;
}

function createMatrix(): SVGMatrix {
  return getSVG().createSVGMatrix();
}

function createPoint(): SVGPoint {
  return getSVG().createSVGPoint();
}

function getDistance(a: Point, b?: Point): number {
  if (!b) return 0;
  return Math.sqrt((b.clientX - a.clientX) ** 2 + (b.clientY - a.clientY) ** 2);
}

function getMidpoint(a: Point, b?: Point): Point {
  if (!b) return a;

  return {
    clientX: (a.clientX + b.clientX) / 2,
    clientY: (a.clientY + b.clientY) / 2,
  };
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

export interface Position {
  x: number;
  y: number;
}

export default class PinchZoom extends Component<PinchZoomProps, any> {
  static defaultProps = {
    prefixCls: 'za-pinch-zoom',
    minScale: 1,
    maxScale: 3,
  };

  private _container;

  private _transform: SVGMatrix = createMatrix();

  private _positioningEl?: Element;

  // private _originPosition: Position;

  constructor(props) {
    super(props);
    this._container = React.createRef();
  }

  componentDidMount() {
    const { current = {} } = this._container;
    const { children } = current;
    const [el] = children;
    this._positioningEl = el;
    const pointerTracker: PointerTracker = new PointerTracker(current, {
      start: () => {
        // We only want to track 2 pointers at most
        // const positioningElBounds = el.getBoundingClientRect();
        // const { x, y } = positioningElBounds;
        // this._originPosition = {
        //   x,
        //   y,
        // };
        if (pointerTracker.currentPointers.length === 2 || !this._positioningEl) return false;
        // event.preventDefault();
        return true;
      },
      move: (previousPointers) => {
        this._onPointerMove(previousPointers, pointerTracker.currentPointers);
      },
    });
    this._container.current.addEventListener('wheel', (event) => this._onWheel(event));
  }

  get x() {
    return this._transform.e;
  }

  get scale() {
    return this._transform.a;
  }

  get y() {
    return this._transform.f;
  }

  /**
  * Update the stage with a given scale/x/y.
  */
  setTransform(opts) {
    const {
      scale = this.scale,
      // moveChange,
    } = opts;

    let {
      x = this.x,
      y = this.y,
    } = opts;

    // If we don't have an element to position, just set the value as given.
    // We'll check bounds later.
    if (!this._positioningEl) {
      this._updateTransform(scale, x, y);
      return;
    }

    // Get current layout
    const thisBounds = this._container.current.getBoundingClientRect();
    const positioningElBounds = this._positioningEl.getBoundingClientRect();

    // Not displayed. May be disconnected or display:none.
    // Just take the values, and we'll check bounds later.
    if (!thisBounds.width || !thisBounds.height) {
      this._updateTransform(scale, x, y);
      return;
    }

    // Create points for _positioningEl.
    let topLeft = createPoint();
    topLeft.x = positioningElBounds.left - thisBounds.left;
    topLeft.y = positioningElBounds.top - thisBounds.top;
    let bottomRight = createPoint();
    bottomRight.x = positioningElBounds.width + topLeft.x;
    bottomRight.y = positioningElBounds.height + topLeft.y;

    // Calculate the intended position of _positioningEl.
    const matrix = createMatrix()
      .translate(x, y)
      .scale(scale)
      // Undo current transform
      .multiply(this._transform.inverse());

    topLeft = topLeft.matrixTransform(matrix);
    bottomRight = bottomRight.matrixTransform(matrix);

    // Ensure _positioningEl can't move beyond out-of-bounds.
    // Correct for x
    if (topLeft.x > thisBounds.width) {
      x += thisBounds.width - topLeft.x;
    } else if (bottomRight.x < 0) {
      x += -bottomRight.x;
    }

    // Correct for y
    if (topLeft.y > thisBounds.height) {
      y += thisBounds.height - topLeft.y;
    } else if (bottomRight.y < 0) {
      y += -bottomRight.y;
    }

    const { minScale, maxScale } = this.props;
    const zoom = range(scale, minScale, maxScale);

    // if (x > (positioningElBounds.width - thisBounds.width) / 2) {
    //   x = (positioningElBounds.width - thisBounds.width) / 2;
    // }

    // console.log('x:', x, 'x1:', (this._positioningEl.width - thisBounds.width) * -1)
    if (x > 0) {
      x = 0;
    }

    if (x < (positioningElBounds.width - thisBounds.width) * -1) {
      x = (positioningElBounds.width - thisBounds.width) * -1;
    }

    // if (positioningElBounds.height < thisBounds.height) {
    //   if (moveChange) {
    //     y = this.y;
    //   }
    // }
    // if (y < positioningElBounds.height - thisBounds.height) {
    //   y = positioningElBounds.height - thisBounds.height;
    // }
    // todo

    this._updateTransform(zoom, zoom !== minScale ? x : 0, zoom !== minScale ? y : 0);
  }

  _onWheel = (event) => {
    event.preventDefault();

    const currentRect = this._positioningEl!.getBoundingClientRect();
    let { deltaY } = event;
    const { ctrlKey, deltaMode } = event;

    if (deltaMode === 1) { // 1 is "lines", 0 is "pixels"
      // Firefox uses "lines" for some types of mouse
      deltaY *= 15;
    }

    // ctrlKey is true when pinch-zooming on a trackpad.
    const divisor = ctrlKey ? 100 : 300;
    const scaleDiff = 1 - deltaY / divisor;
    this._applyChange({
      scaleDiff,
      originX: event.clientX - currentRect.left,
      originY: event.clientY - currentRect.top,
    });
  };

  _applyChange = (opts) => {
    const {
      panX = 0,
      panY = 0,
      originX = 0,
      originY = 0,
      scaleDiff = 1,
      moveChange,
    } = opts;

    const matrix = createMatrix()
      // Translate according to panning.
      .translate(panX, panY)
      // Scale about the origin.
      .translate(originX, originY)
      // Apply current translate
      .translate(this.x, this.y)
      .scale(scaleDiff)
      .translate(-originX, -originY)
      // Apply current scale.
      .scale(this.scale);

    const { maxScale } = this.props;
    if (matrix.a > maxScale) {
      return false;
    }
    // const scale = range(matrix.a, minScale, maxScale);
    // Convert the transform into basic translate & scale.
    this.setTransform({
      scale: matrix.a,
      x: matrix.e,
      y: matrix.f,
      moveChange,
    });
  };

  private _onPointerMove(previousPointers: Pointer[], currentPointers: Pointer[]) {
    if (!this._positioningEl) return;

    // Combine next points with previous points
    const currentRect = this._positioningEl.getBoundingClientRect();

    // For calculating panning movement
    const prevMidpoint = getMidpoint(previousPointers[0], previousPointers[1]);
    const newMidpoint = getMidpoint(currentPointers[0], currentPointers[1]);

    // Midpoint within the element
    const originX = prevMidpoint.clientX - currentRect.left;
    const originY = prevMidpoint.clientY - currentRect.top;

    // Calculate the desired change in scale
    const prevDistance = getDistance(previousPointers[0], previousPointers[1]);
    const newDistance = getDistance(currentPointers[0], currentPointers[1]);
    const scaleDiff = prevDistance ? newDistance / prevDistance : 1;
    this._applyChange({
      originX,
      originY,
      scaleDiff,
      panX: newMidpoint.clientX - prevMidpoint.clientX,
      panY: newMidpoint.clientY - prevMidpoint.clientY,
      moveChange: currentPointers.length !== 2,
    });
  }

  /**
   * Update transform values without checking bounds. This is only called in setTransform.
   */
  private _updateTransform(scale: number, x: number, y: number) {
    // Avoid scaling to zero
    // Return if there's no change
    if (
      scale === this.scale
      && x === this.x
      && y === this.y
    ) return;

    this._transform.e = x;
    this._transform.f = y;
    this._transform.d = this._transform.a = scale;

    this._container.current.style.setProperty('--x', `${this.x}px`);
    this._container.current.style.setProperty('--y', `${this.y}px`);
    this._container.current.style.setProperty('--scale', this.scale);
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange({
        x,
        y,
        scale,
      });
    }
  }

  render() {
    const { children, className, prefixCls } = this.props;
    return (<div ref={this._container} className={`${className} ${prefixCls}`}>{children}</div>);
  }
}
