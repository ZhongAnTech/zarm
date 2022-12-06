import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import Popup from '../popup';
import type { BaseToastProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export type ToastProps = BaseToastProps & HTMLProps;

const Toast = React.forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-toast`;

  const toastRef = ref || React.createRef<HTMLDivElement>();
  const {
    className,
    stayTime,
    content,
    visible: propVisible,
    afterClose,
    style,
    ...others
  } = props;
  const [visible, setVisible] = useState(propVisible!);
  const timerRef = useRef(0);

  const hide = () => {
    setVisible(false);
  };

  const autoClose = useCallback(() => {
    if (stayTime! > 0) {
      timerRef.current = window.setTimeout(() => {
        hide();
        window.clearTimeout(timerRef.current!);
      }, stayTime);
    }
  }, [stayTime]);

  useEffect(() => {
    if (visible) {
      autoClose();
    }
    return () => {
      window.clearTimeout(timerRef.current!);
    };
  }, [autoClose, visible]);

  useEffect(() => {
    setVisible(propVisible!);
  }, [propVisible]);

  return (
    <Popup
      direction="center"
      maskColor="transparent"
      width="70%"
      lockScroll={false}
      {...others}
      visible={visible}
      afterClose={afterClose}
    >
      <div className={classNames(prefixCls, className)} ref={toastRef} style={style}>
        <div className={`${prefixCls}__container`}>{content}</div>
      </div>
    </Popup>
  );
});

Toast.displayName = 'Toast';

Toast.defaultProps = {
  visible: false,
  stayTime: 3000,
  mask: false,
};

export default Toast;
