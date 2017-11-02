interface BaseProps {
  disabled?: boolean;
  multiple?: boolean;
  quality?: number;
  accept?: string;
  capture?: any;
  onChange?: (file: Object | Array<Object>) => void;
  onBeforeSelect?: () => boolean;
}

export interface UploaderProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}