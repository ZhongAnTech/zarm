interface BaseProps {
  visible?: boolean;
  message?: any;
  children?: any;
}

export interface TooltipProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}

declare global {
  interface Window {
    zarmTooltip?: any;
  }
}