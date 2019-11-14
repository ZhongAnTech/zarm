import { PureComponent, cloneElement, ReactElement } from 'react';
import Events from '../utils/events';
import PropsType from './PropsType';

export type DragProps = PropsType;

export default class Drag extends PureComponent<DragProps, {}> {
  private dragState = Object.create(null);

  onTouchStart = (event) => {
    this.dragState.startTime = new Date();

    if (!event.touches) {
      this.dragState.startX = event.clientX;
      this.dragState.startY = event.clientY;

      Events.on(document.body, 'mousemove', this.onTouchMove);
      Events.on(document.body, 'mouseup', this.onTouchEnd);
    } else {
      const touch = event.touches[0];
      this.dragState.startX = touch.pageX;
      this.dragState.startY = touch.pageY;
    }

    const { onDragStart } = this.props;
    if (typeof onDragStart === 'function') {
      onDragStart(event, this.dragState);
    }
  };

  onTouchMove = (event) => {
    if (this.dragState.startX === undefined) return false;
    let currentX: number;
    let currentY: number;

    if (!event.touches) {
      currentX = event.clientX;
      currentY = event.clientY;
    } else {
      const touch = event.touches[0];
      currentX = touch.pageX;
      currentY = touch.pageY;
    }

    const offsetX = currentX - this.dragState.startX;
    const offsetY = currentY - this.dragState.startY;

    const state = {
      ...this.dragState,
      offsetX,
      offsetY,
      currentX,
      currentY,
    };

    const { onDragMove } = this.props;
    if (typeof onDragMove === 'function' && !onDragMove(event, state)) {
      return;
    }

    this.dragState = state;
  };

  onTouchEnd = (event) => {
    if (this.dragState.startX === undefined) return false;
    if (event && !event.touches) {
      Events.off(document.body, 'mousemove', this.onTouchMove);
      Events.off(document.body, 'mouseup', this.onTouchEnd);
    }

    const { onDragEnd } = this.props;
    if (typeof onDragEnd === 'function') {
      onDragEnd(event, this.dragState);
    }
    this.dragState = Object.create(null);
  };

  render() {
    const { children } = this.props;
    return cloneElement(children as ReactElement<any>, {
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd,
      onMouseDown: this.onTouchStart,
      onMouseMove: this.onTouchMove,
      onMouseUp: this.onTouchEnd,
    });
  }
}
