export type DragEvent = MouseEvent | TouchEvent;

export interface DragState {
  startTime?: Date;
  startX?: number;
  startY?: number;
  offsetX?: number;
  offsetY?: number;
}

export interface DragProps {
  onDragStart?: (event?: DragEvent, dragState?: DragState) => void;
  onDragMove?: (event?: DragEvent, dragState?: DragState) => boolean;
  onDragEnd?: (event?: DragEvent, dragState?: DragState) => void;
}
