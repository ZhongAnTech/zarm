import type LOAD_STATUS from './utils/loadStatus';

export interface ImageObject {
  url: string;
  originUrl: string;
}

export type Images = Array<Partial<ImageObject> & { loaded?: LOAD_STATUS }>;

export interface BaseImagePreviewProps {
  images: ReadonlyArray<ImageObject | string>;
  visible: boolean;
  activeIndex: number;
  showPagination: boolean;
  maxScale: number;
  minScale: number;
  onChange?: Function;
  onClose?: Function;
}
