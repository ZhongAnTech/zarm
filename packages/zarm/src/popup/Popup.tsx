import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import { useLockScroll } from '../utils/hooks';
import Trigger from '../trigger';
import Mask from '../mask';
import type { BasePopupProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';
import { renderToContainer } from '../utils/dom';
import Transition from '../transition';

export type PopupProps = BasePopupProps & HTMLProps;

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
    destroy,
    forceRender,
    visible,
    animationType,
    animationDuration,
    lockScroll,
    direction,
    mask,
    maskColor,
    maskOpacity,
    afterOpen,
    afterClose,
    onMaskClick,
    onEsc,
    children,
  } = props;

  const { prefixCls, mountContainer } = React.useContext(ConfigContext);
  const bem = createBEM('popup', { prefixCls });

  useLockScroll(visible! && lockScroll!);

  const handleEsc = React.useCallback(() => {
    onEsc?.();
  }, []);

  const transitionName = animationType ?? TRANSITION_NAMES[direction!];

  return (
    <Trigger visible={visible} onClose={handleEsc}>
      {mask && (
        <Mask
          visible={visible}
          color={maskColor}
          opacity={maskOpacity}
          animationDuration={animationDuration}
          mountContainer={props.mountContainer ?? mountContainer}
          forceRender={forceRender}
          destroy={destroy}
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
        forceRender={forceRender}
        destroy={destroy}
        onEnter={() => {
          afterOpen?.();
        }}
        onLeaveEnd={() => {
          afterClose?.();
        }}
      >
        {({ className, style }, setNodeRef) => {
          const { display, ...restStyle } = style;
          return renderToContainer(
            props.mountContainer ?? mountContainer,
            <div className={bem('wrapper', [props.className])} style={{ display }}>
              <div
                ref={setNodeRef}
                className={bem([{ [`${direction}`]: !!direction }, className])}
                style={{
                  ...props.style,
                  ...restStyle,
                  width,
                }}
              >
                {children}
              </div>
            </div>,
          );
        }}
      </Transition>
    </Trigger>
  );
});

Popup.displayName = 'Popup';

Popup.defaultProps = {
  visible: false,
  mask: true,
  direction: 'bottom',
  destroy: true,
  lockScroll: true,
};

export default Popup;
