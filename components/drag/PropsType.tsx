export default interface PropsType {
  onDragStart?: (event?: any, dragState?: Object) => void;
  onDragMove?: (event?: any, dragState?: Object) => boolean;
  onDragEnd?: (event?: any, dragState?: Object) => void;
}
