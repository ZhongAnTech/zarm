import * as React from 'react';

export type DragEvent = React.MouseEvent | React.TouchEvent;

export interface DragState {
  startTime?: Date;
  startX?: number;
  startY?: number;
  offsetX?: number;
  offsetY?: number;
}

export interface UseDragProps {
  onDragStart?: (event: DragEvent, dragState: DragState) => void;
  onDragMove?: (event: DragEvent, dragState: DragState) => boolean;
  onDragEnd?: (event: DragEvent, dragState: DragState) => void;
}
