import React, {
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
  useMemo,
  useImperativeHandle,
  cloneElement,
  forwardRef,
} from 'react';
import { createPortal } from 'react-dom';
import { createBEM } from '@zarm-design/bem';
import { Transition } from 'react-transition-group';
import {
  useClick,
  useFloating,
  flip,
  shift,
  useInteractions,
  offset,
  autoUpdate,
  useRole,
  arrow,
  useHover,
  useFocus,
  useDismiss,
} from '@floating-ui/react-dom-interactions';
import { canUseDOM, getOuterSizes, getMountContainer } from '../utils/dom';
import BasePopperProps, { directionMap } from './interface';
import { ConfigContext } from '../n-config-provider';
import { getTransitionName, getTransformOrigin } from './utils';
import mergeRefs from '../utils/mergeRefs';

interface PopperProps extends BasePopperProps, HTMLAttributes<HTMLDivElement> {}

const Popper = forwardRef<any, PopperProps>((props, ref) => {
  const { prefixCls } = React.useContext(ConfigContext);
  const {
    visible,
    mountContainer,
    direction,
    destroy,
    trigger,
    animationDuration,
    hasArrow,
    className,
    animationType,
    content,
    style,
    children,
    arrowPointAtCenter,
    arrowClassName,
    onVisibleChange,
  } = props;

  const bem = createBEM('popper', { prefixCls });

  const [open, setOpen] = useState(visible);
  const [mounted, setMounted] = useState(false);
  const arrowRef = useRef<HTMLElement | null>(null);

  const offsetVlaue = useMemo(() => {
    return getOuterSizes(arrowRef.current);
  }, [arrowRef.current]);

  const middleware = [offset(offsetVlaue.height), flip(), shift()];

  if (hasArrow) {
    middleware.push(
      arrow({
        element: arrowRef,
      }),
    );
  }
  const { x, y, reference, floating, strategy, context, update } = useFloating({
    open,
    onOpenChange: (state) => {
      setOpen(state);
      if (typeof onVisibleChange === 'function') {
        onVisibleChange(state);
      }
    },
    middleware,
    placement: directionMap[direction!],
    whileElementsMounted: autoUpdate,
  });

  useImperativeHandle(ref, () => {
    return {
      update: () => {
        update();
      },
    };
  });

  function computeArrowStyle(ctx) {
    const { x: arrowX, y: arrowY } = ctx?.middlewareData?.arrow || {};
    if (arrowRef.current) {
      const postion = ctx.placement.split('-');
      if (!postion[1] || arrowPointAtCenter) {
        return {
          left: x != null ? `${arrowX}px` : '',
          top: y != null ? `${arrowY}px` : '',
        };
      }
      let postionMap = {
        start: 'top',
        end: 'bottom',
      };
      if (postion[0] === 'top' || postion[0] === 'bottom') {
        postionMap = {
          start: 'left',
          end: 'right',
        };
      }

      return {
        [postionMap[postion[1]]]: `${offsetVlaue.width * 2}px`,
      };
    }
  }

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      restMs: 100,
      enabled: trigger === 'hover',
      delay: {
        open: props.mouseEnterDelay,
        close: props.mouseLeaveDelay,
      },
    }),
    useClick(context, { enabled: trigger === 'click' }),
    useFocus(context, { enabled: trigger === 'focus' }),
    useRole(context, { role: 'menu', enabled: trigger === 'contextMenu' }),
    useDismiss(context, { enabled: trigger !== 'manual' }),
  ]);

  // useClickAway(refs?.domReference.current, () => {
  //   setOpen(false);
  // });

  const innerCls = (state) => {
    const animationState = {
      entered: 'enter',
      exited: 'leave',
      entering: 'enter',
      exiting: 'leave',
    }[state];
    const transitionName = getTransitionName(
      prefixCls,
      directionMap[direction!],
      animationType,
      animationState,
    );
    const isPending = state === 'entering' || state === 'exiting' || state === 'entered';
    return bem([
      {
        [`${direction}`]: true,
        hidden: state === 'exited',
      },
      className,
      isPending ? `${transitionName}` : '',
    ]);
  };

  useEffect(() => {
    open && setMounted(true);
  }, [open]);

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  const hidden = () => {
    setOpen(false);
    destroy && setMounted(false);
  };
  const toolTip = (
    <Transition timeout={animationDuration} in={open} onExited={hidden}>
      {(state) => (
        <div
          {...getFloatingProps({
            ref: floating,
            className: innerCls(state),
            style: {
              ...style,
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              animationDuration: `${animationDuration}ms`,
              display: state === 'exited' ? 'none' : '',
              transformOrigin: getTransformOrigin(context.placement),
            },
          })}
          data-popper-placement={context.placement}
        >
          <div className={bem('content')}>
            {content}
            {hasArrow && (
              <span
                className={bem('arrow', [arrowClassName])}
                ref={arrowRef}
                style={computeArrowStyle(context)}
              />
            )}
          </div>
        </div>
      )}
    </Transition>
  );

  const newRef = useMemo(() => mergeRefs([reference, (children as any).ref]), [
    reference,
    children,
  ]);

  const child = React.isValidElement(children) ? children : <span>{children}</span>;
  const childrenProps: React.RefAttributes<any> & React.HTMLAttributes<any> = {
    ...(children && (children as React.ReactElement).props),
  };
  return (
    <>
      {mounted && createPortal(toolTip, getMountContainer(mountContainer))}
      {cloneElement(child, getReferenceProps({ ref: newRef, ...childrenProps }))}
    </>
  );
});

Popper.defaultProps = {
  hasArrow: false,
  destroy: false,
  arrowPointAtCenter: false,
  trigger:
    (canUseDOM && /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
      ? 'click'
      : 'hover') || 'click',
  direction: 'top',
  mouseEnterDelay: 150,
  mouseLeaveDelay: 100,
  visible: false,
  animationType: 'zoomFade',
  animationDuration: 300,
  onVisibleChange: () => {},
};

export default Popper;
