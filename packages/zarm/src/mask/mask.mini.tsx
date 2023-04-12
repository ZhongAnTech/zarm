import * as React from 'react';
import { View, ITouchEvent, ViewProps } from '@tarojs/components';
import { createBEM } from '@zarm-design/bem';
import isFinite from 'lodash/isFinite';
import type { BaseMaskProps } from './interface';
import Transition from '../transition';
import { ConfigContext } from '../config-provider';

const OpacityList = {
  normal: 0.55,
  light: 0.35,
  dark: 0.75,
};

export type MaskProps = BaseMaskProps &
  ViewProps & {
    onClick: (event: ITouchEvent) => void;
  };

const Mask = React.forwardRef<HTMLDivElement, MaskProps>((props, ref) => {
  const {
    style,
    className,
    visible,
    color,
    opacity,
    animationDuration,
    onClick,
    children,
  } = props;

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('mask', { prefixCls });

  const rgb = color === 'black' ? '0, 0, 0' : '255, 255, 255';
  const backgroundOpacity = isFinite(opacity) ? opacity : OpacityList[opacity!];

  return (
    <Transition
      nodeRef={ref}
      visible={visible}
      tranisitionName={`${prefixCls}-fade`}
      duration={animationDuration}
    >
      {(rest, setNodeRef) =>
        (
          <View
            ref={setNodeRef}
            className={bem([className, rest.className])}
            style={{
              ...style as React.CSSProperties,
              ...rest.style,
              backgroundColor:
                color === 'transparent' ? 'transparent' : `rgba(${rgb}, ${backgroundOpacity})`,
            }}
            onClick={onClick}
          >
            {children}
          </View>
        )
      }
    </Transition>
  );
});

Mask.displayName = 'Mask';

Mask.defaultProps = {
  visible: false,
  color: 'black',
  opacity: 'normal',
};

export default Mask;