export default interface PropsType {
  disabled?: boolean;
  multiple?: boolean;
  quality?: number;
  accept?: string;
  capture?: any;
  onChange?: (file: Object | Array<Object>) => void;
  onBeforeSelect?: () => boolean;
  children?: any;
}
