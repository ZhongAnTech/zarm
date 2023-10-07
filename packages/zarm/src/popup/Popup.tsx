import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Mask from '../mask';
import Transition from '../transition';
import Trigger from '../trigger';
import { renderToContainer } from '../utils/dom';
import { useLockScroll } from '../utils/hooks';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BasePopupProps } from './interface';

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
    maskClassName,
    maskStyle,
    maskColor,
    maskOpacity,
    afterOpen,
    afterClose,
    onOpen,
    onClose,
    onMaskClick,
    onEsc,
    children,
  } = props;

  const { prefixCls, mountContainer: globalMountContainer } = React.useContext(ConfigContext);
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
          className={maskClassName}
          style={maskStyle}
          visible={visible}
          color={maskColor}
          opacity={maskOpacity}
          animationDuration={animationDuration}
          mountContainer={props.mountContainer}
          forceRender={forceRender}
          destroy={destroy}
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
        onEnterActive={() => {
          onOpen?.();
        }}
        onLeaveActive={() => {
          onClose?.();
        }}
        onLeaveEnd={() => {
          afterClose?.();
        }}
      >
        {({ className, style }, setNodeRef) => {
          const { display, ...restStyle } = style;
          return renderToContainer(
            props.mountContainer ?? globalMountContainer,
            <div
              className={bem('wrapper', [props.className])}
              style={{ ...props.style, display }}
              onClick={() => {
                onMaskClick?.();
              }}
            >
              <div
                ref={setNodeRef}
                className={bem([{ [`${direction}`]: !!direction }, className])}
                style={{
                  ...restStyle,
                  width,
                }}
                onClick={(e) => {
                  e.stopPropagation();
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
