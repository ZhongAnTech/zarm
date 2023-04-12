import * as React from 'react';
import { View, ViewProps } from '@tarojs/components';
import { createBEM } from '@zarm-design/bem';
import Mask from '../mask/index.mini';
import type { BasePopupProps } from './interface';
import { ConfigContext } from '../config-provider';

import Transition from '../transition';

export type PopupProps = BasePopupProps & ViewProps;

const TRANSITION_NAMES = {
  top: 'move-down',
  bottom: 'move-up',
  center: 'fade',
  left: 'move-left',
  right: 'move-right',
};

const Popup = React.forwardRef<HTMLDivElement, PopupProps>((props, ref) => {
  const {
    width,
    visible,
    animationType,
    animationDuration,
    direction,
    mask,
    maskColor,
    maskOpacity,
    afterOpen,
    afterClose,
    onMaskClick,
    children,
  } = props;

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('popup', { prefixCls });

  const transitionName = animationType ?? TRANSITION_NAMES[direction!];

  return (
    <View>
      {mask && (
        <Mask
          visible={visible}
          color={maskColor}
          opacity={maskOpacity}
          animationDuration={animationDuration}
          // mountContainer={nodeR}
          onClick={() => {
            onMaskClick?.();
          }}
        />
      )}
      <Transition
        nodeRef={ref}
        visible={visible}
        tranisitionName={`${prefixCls}-${transitionName}`}
        duration={animationDuration}
        onEnter={() => {
          afterOpen?.();
        }}
        onLeaveEnd={() => {
          afterClose?.();
        }}
      >
        {({ className, style }, setNodeRef) => {
          const { display, ...restStyle } = style;
          return (
            <View className={bem('wrapper', [props.className])} style={{ ...props.style as React.CSSProperties, display }}>
              <View
                ref={setNodeRef}
                className={bem([{ [`${direction}`]: !!direction }, className])}
                style={{
                  ...restStyle,
                  width,
                }}
              >
                {children}
              </View>
            </View>
          )
        }}
      </Transition>
    </View>
  );
});

Popup.displayName = 'Popup';

Popup.defaultProps = {
  visible: false,
  mask: true,
  direction: 'bottom',
  // timeout: 300,
};

export default Popup;