import { MouseEvent, TouchEvent } from 'react';

export type DragEvent = MouseEvent | TouchEvent;

export interface DragState {
  startTime?: Date;
  startX?: number;
  startY?: number;
  offsetX?: number;
  offsetY?: number;
  // currentX?: number;
  // currentY?: number;
}

export default interface PropsType {
  onDragStart?: (event?: DragEvent, dragState?: DragState) => void;
  onDragMove?: (event?: DragEvent, dragState?: DragState) => boolean;
  onDragEnd?: (event?: DragEvent, dragState?: DragState) => void;
}
