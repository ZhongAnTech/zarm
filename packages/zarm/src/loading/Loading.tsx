import React, { RefAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../config-provider';
import Popup from '../popup';
import ActivityIndicator from '../activity-indicator';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseLoadingProps } from './interface';

export interface LoadingCssVars {
  '--background'?: React.CSSProperties['background'];
}

export type LoadingProps = BaseLoadingProps & HTMLProps<LoadingCssVars>;

export interface UseLoading {
  show: (props: LoadingProps) => void;
  hide: () => void;
}
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<LoadingProps & RefAttributes<HTMLDivElement>> {
  useLoading: () => UseLoading;
}

const Loading = React.forwardRef<unknown, LoadingProps>((props, ref) => {
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('loading', { prefixCls });

  const loadingRef = (ref as any) || React.createRef<HTMLDivElement>();

  const {
    className,
    visible: propVisible,
    content,
    afterClose,
    stayTime,
    style,
    ...others
  } = props;

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
      maskColor="transparent"
      width="70%"
      {...others}
      visible={visible}
      afterClose={afterClose}
    >
      <div className={bem([className])} ref={loadingRef} style={style}>
        <div className={bem('container')} style={style}>
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
