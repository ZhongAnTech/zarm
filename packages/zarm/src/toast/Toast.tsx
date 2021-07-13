import React, { useCallback, useEffect, useRef, useState } from 'react';
import BaseToastProps from './interface';
import Popup from '../popup';
import { ConfigContext } from '../n-config-provider';

export interface ToastProps extends BaseToastProps {
  className?: string;
}
export interface UseToast {
  show: (props: ToastProps) => void;
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

  const timerRef = useRef<NodeJS.Timeout>();

  const _hide = () => {
    setVisible(false);
  };

  const autoClose = useCallback(() => {
    if (stayTime! > 0) {
      timerRef.current = setTimeout(() => {
        _hide();
        clearTimeout(timerRef.current!);
      }, stayTime);
    }
  }, [stayTime]);

  useEffect(() => {
    if (visible) {
      autoClose();
    }
    return () => {
      clearTimeout(timerRef.current!);
    };
  }, [autoClose, visible]);

  useEffect(() => {
    setVisible(propVisible!);
  }, [propVisible]);

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
