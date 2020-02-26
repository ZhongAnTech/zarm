export interface Iimage { url?: string; originUrl?: string }

export default interface PropsType {
  images: Array<Iimage> | Array<string>;
  title?: string;
  visible: boolean;
  activeIndex?: number;
  onHide?: Function;
  maxScale?: number;
  minScale?: number;
}
