interface BaseProps {
  onDragStart?: (event?: any, dragState?: Object) => void;
  onDragMove?: (event?: any, dragState?: Object) => void;
  onDragEnd?: (event?: any, dragState?: Object) => void;
  children?: any;
}

export interface DragProps extends BaseProps {}
