import type LOAD_STATUS from './utils/loadStatus';
import type { Locale } from '../config-provider/PropsType';
import type { ContainerType } from '../utils/dom';

export interface ImageObject {
  src: string;
  originSrc: string;
}

export type Images = Array<Partial<ImageObject> & { loaded?: LOAD_STATUS }>;

export interface BaseImagePreviewProps {
  images: ReadonlyArray<ImageObject | string>;
  visible?: boolean;
  activeIndex?: number;
  showPagination?: boolean;
  maxScale?: number;
  minScale?: number;
  locale?: Locale['ImagePreview'];
  orientation?: 'landscape' | 'portrait';
  mountContainer?: ContainerType | false;
  onChange?: (activeIndex: number) => void;
  onClose?: () => void;
}
