export interface Iimage { url?: string; originUrl?: string }

export default interface PropsType {
  images: Array<Iimage> | Array<string>;
  title?: string;
  visible: boolean;
  activeIndex?: number;
  showPagination?: boolean;
  maxScale?: number;
  minScale?: number;
  onChange?: Function;
  onClose?: Function;
}
