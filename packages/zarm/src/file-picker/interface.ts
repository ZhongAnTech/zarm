export default interface PropsType {
  disabled?: boolean;
  multiple?: boolean;
  quality?: number;
  accept?: string;
  maximum?: number;
  capture?: any;
  onChange?: (file?: object | object[]) => void;
  onBeforeSelect?: () => boolean;
  children?: any;
}
