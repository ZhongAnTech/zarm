import { createBEM } from '@zarm-design/bem';
import { Close, Success } from '@zarm-design/icons';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Loading from '../loading';
import Popup from '../popup';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseToastProps } from './interface';

export type ToastProps = BaseToastProps & HTMLProps;

const Toast = React.forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const {
    className,
    style,
    icon,
    content,
    duration,
    maskStyle,
    maskColor = 'transparent',
    maskClickable,
    onClose,
    ...rest
  } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('toast', { prefixCls });

  const renderIcon = () => {
    if (icon === undefined || icon === null) return null;
    switch (icon) {
      case 'success':
        return <Success />;
      case 'fail':
        return <Close />;
      case 'loading':
        return <Loading type="spinner" size="lg" />;
      default:
        return icon;
    }
  };

  return (
    <Popup
      direction="center"
      maskStyle={{
        pointerEvents: maskClickable ? 'none' : 'auto',
        ...maskStyle,
      }}
      maskColor={maskColor}
      lockScroll={!maskClickable}
      {...rest}
    >
      <div
        ref={ref}
        className={bem([
          {
            icon: !!icon,
            text: !icon,
          },
          className,
        ])}
        style={style}
      >
        {icon && <div className={bem('icon')}>{renderIcon()}</div>}
        {content && <div className={bem('text')}>{content}</div>}
      </div>
    </Popup>
  );
});

export default Toast;
