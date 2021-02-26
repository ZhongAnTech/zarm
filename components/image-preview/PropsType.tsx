export interface ImageSrc {
  url: string;
  originUrl: string;
}

export default interface PropsType {
  images: Array<ImageSrc> | Array<string>;
  visible: boolean;
  activeIndex?: number;
  showPagination?: boolean;
  maxScale?: number;
  minScale?: number;
  onChange?: Function;
  onClose?: Function;
}
