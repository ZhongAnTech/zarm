import React, { HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import type { BaseLoadingProps } from './interface';
import Popup from '../popup';
import { ConfigContext } from '../n-config-provider';
import ActivityIndicator from '../activity-indicator';

export interface LoadingProps extends BaseLoadingProps, HTMLAttributes<HTMLDivElement> {}
export interface UseLoading {
  show: (props: LoadingProps) => void;
  hide: () => void;
}
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<LoadingProps & React.RefAttributes<HTMLDivElement>> {
  useLoading: () => UseLoading;
}

const Loading = React.forwardRef<unknown, LoadingProps>((props, ref) => {
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-loading`;

  const loadingRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { className, visible: propVisible, content, afterClose, stayTime, ...others } = props;

  const [visible, setVisible] = useState(propVisible!);
  const timerRef = useRef(0);

  const _hide = () => {
    setVisible(false);
  };

  const autoClose = useCallback(() => {
    if (stayTime! > 0) {
      timerRef.current = window.setTimeout(() => {
        _hide();
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
      maskType="transparent"
      width="70%"
      {...others}
      visible={visible}
      afterClose={afterClose}
    >
      <div className={prefixCls} ref={loadingRef}>
        <div className={`${prefixCls}__container`}>
          {content || <ActivityIndicator type="spinner" size="lg" />}
        </div>
      </div>
    </Popup>
  );
}) as CompoundedComponent;

Loading.displayName = 'Loading';

Loading.defaultProps = {
  mask: true,
};
export default Loading;
