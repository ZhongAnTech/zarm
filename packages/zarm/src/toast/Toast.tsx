import React, { useCallback, useEffect, useRef, useState } from 'react';
import BaseToastProps from './interface';
import Popup from '../popup';
import { ConfigContext } from '../n-config-provider';

export interface ToastProps extends BaseToastProps {
  className?: string;
}
export interface UseToast {
  show: (propsType: ToastProps) => void;
  hide: () => void;
}
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<ToastProps & React.RefAttributes<HTMLElement>> {
  useToast: () => UseToast;
}
const Toast = React.forwardRef<unknown, ToastProps>((props, ref) => {
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-toast`;

  const toastRef = (ref as any) || React.createRef<HTMLElement>();
  const { className, stayTime, content, visible: propVisible, afterClose, ...others } = props;

  const [visible, setVisible] = useState(propVisible!);

  const timerRef = useRef<number>();

  const _hide = () => {
    setVisible(false);
  };

  const autoClose = useCallback(() => {
    if ((stayTime as number) > 0) {
      timerRef.current = window.setTimeout(() => {
        _hide();
        clearTimeout(timerRef.current);
      }, stayTime);
    }
  }, [stayTime]);

  useEffect(() => {
    autoClose();
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [autoClose]);

  return (
    <Popup
      direction="center"
      maskType="transparent"
      width="70%"
      {...others}
      visible={visible}
      afterClose={afterClose}
    >
      <div className={prefixCls} ref={toastRef}>
        <div className={`${prefixCls}__container`}>{content}</div>
      </div>
    </Popup>
  );
}) as CompoundedComponent;

Toast.displayName = 'Toast';

Toast.defaultProps = {
  visible: false,
  stayTime: 3000,
  mask: false,
};

export default Toast;
