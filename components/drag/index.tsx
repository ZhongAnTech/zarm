import { PureComponent, cloneElement, ReactElement } from 'react';
import Events from '../utils/events';
import DragProps, { DragEvent, DragState } from './PropsType';

export { DragProps, DragEvent, DragState };

export default class Drag extends PureComponent<DragProps, {}> {
  private currentX?: number;

  private currentY?: number;

  private dragState: DragState = Object.create(null);

  get isDragStart() {
    return this.dragState.startX !== undefined && this.dragState.startY !== undefined;
  }

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

    const state: DragState = {
      ...this.dragState,
    };

    const { onDragStart } = this.props;
    if (typeof onDragStart === 'function') {
      onDragStart(event, state);
    }
  };

  onTouchMove = (event) => {
    if (!this.isDragStart) return false;

    if (!event.touches) {
      this.currentX = event.clientX;
      this.currentY = event.clientY;
    } else {
      const touch = event.touches[0];
      this.currentX = touch.pageX;
      this.currentY = touch.pageY;
    }

    const offsetX = this.currentX! - this.dragState.startX!;
    const offsetY = this.currentY! - this.dragState.startY!;

    const state: DragState = {
      ...this.dragState,
      offsetX,
      offsetY,
      // currentX: this.currentX,
      // currentY: this.currentY,
    };

    const { onDragMove } = this.props;
    if (typeof onDragMove === 'function' && !onDragMove(event, state)) {
      return;
    }

    this.dragState = state;
  };

  onTouchEnd = (event) => {
    if (!this.isDragStart) return false;

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
