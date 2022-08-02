import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { CSSTransition } from 'react-transition-group';
import { ConfigContext } from '../n-config-provider';
import { useLockScroll } from '../utils/hooks';
import Trigger from '../trigger';
import Mask from '../mask';
import type { BasePopupProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';
import { renderToContainer } from '../utils/dom';

export type PopupProps = BasePopupProps & HTMLProps;

const TRANSITION_NAMES = {
  top: 'slide-down',
  bottom: 'slide-up',
  center: 'fade',
  left: 'slide-left',
  right: 'slide-right',
};

const Popup = React.forwardRef<HTMLDivElement, PopupProps>((props, ref) => {
  const {
    className,
    style,
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
  const nodeRef = React.useRef<HTMLDivElement>(null);

  const { prefixCls, mountContainer } = React.useContext(ConfigContext);
  const bem = createBEM('popup', { prefixCls });
  const [animatedVisible, setAnimatedVisible] = React.useState(visible);

  useLockScroll(visible! && lockScroll!);

  React.useImperativeHandle(ref, () => nodeRef.current!);

  const handleEsc = React.useCallback(() => {
    onEsc?.();
  }, []);

  const styles = {
    ...style,
    width,
    WebkitTransitionDuration: animationDuration ? `${animationDuration}ms` : undefined,
    transitionDuration: animationDuration ? `${animationDuration}ms` : undefined,
  };

  const transitionName = animationType ?? TRANSITION_NAMES[direction!];

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={visible}
      timeout={animationDuration!}
      classNames={`${prefixCls}-${transitionName}`}
      mountOnEnter={!forceRender}
      unmountOnExit={destroy}
      onEnter={() => {
        setAnimatedVisible(true);
        afterOpen?.();
      }}
      onExited={() => {
        setAnimatedVisible(false);
        afterClose?.();
      }}
    >
      {() =>
        renderToContainer(
          props.mountContainer ?? mountContainer,
          <Trigger visible={visible} onClose={handleEsc}>
            {mask && (
              <Mask
                visible={visible}
                color={maskColor}
                opacity={maskOpacity}
                mountContainer={false}
                forceRender={forceRender}
                destroy={destroy}
                onClick={() => {
                  onMaskClick?.();
                }}
              />
            )}
            <div
              className={bem('wrapper', [className])}
              style={{ display: !visible && !animatedVisible ? 'none' : undefined }}
            >
              <div
                ref={nodeRef}
                className={bem([{ [`${direction}`]: !!direction }])}
                style={styles}
              >
                {children}
              </div>
            </div>
          </Trigger>,
        )
      }
    </CSSTransition>
  );
});

Popup.displayName = 'Popup';

Popup.defaultProps = {
  visible: false,
  mask: true,
  direction: 'bottom',
  animationDuration: 200,
  destroy: true,
  lockScroll: true,
};

export default Popup;
