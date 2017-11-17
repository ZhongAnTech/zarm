export default interface PropsType {
  visible?: boolean;
  message?: any;
  children?: any;
}

declare global {
  interface Window {
    zarmTooltip?: any;
  }
}
