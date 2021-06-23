import { PureComponent, cloneElement } from 'react';
import type { ReactElement } from 'react';
import type { DragEvent, DragState, DragProps } from './interface';
import Events from '../utils/events';

function isMouseEvent(e: DragEvent): e is MouseEvent {
  return e && !('touches' in e);
}

export type { DragEvent, DragState, DragProps };

export default class Drag extends PureComponent<DragProps, {}> {
  private currentX?: number;

  private currentY?: number;

  private dragState: DragState = Object.create(null);

  get isDragStart() {
    return this.dragState.startX !== undefined && this.dragState.startY !== undefined;
  }

  onTouchStart = (event: DragEvent) => {
    this.dragState.startTime = new Date();

    if (isMouseEvent(event)) {
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

  onTouchMove = (event: DragEvent) => {
    if (!this.isDragStart) return false;

    if (isMouseEvent(event)) {
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
    };

    const { onDragMove } = this.props;
    if (typeof onDragMove === 'function' && !onDragMove(event, state)) {
      return;
    }

    this.dragState = state;
  };

  onTouchEnd = (event: DragEvent) => {
    if (!this.isDragStart) return false;

    if (isMouseEvent(event)) {
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
