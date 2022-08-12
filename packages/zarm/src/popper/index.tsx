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
import {
  useClick,
  useFloating,
  flip,
  shift,
  useInteractions,
  offset,
  autoUpdate,
  arrow,
  useHover,
  useFocus,
  useDismiss,
} from '@floating-ui/react-dom-interactions';

import Transition from '../transition';
import { canUseDOM, getOuterSizes, renderToContainer } from '../utils/dom';
import BasePopperProps, { directionMap } from './interface';
import { ConfigContext } from '../n-config-provider';
import { getTransitionName, getTransformOrigin } from './utils';
import mergeRefs from '../utils/mergeRefs';

interface PopperProps extends BasePopperProps, HTMLAttributes<HTMLDivElement> {}

export interface PopperCssVars {
  '--arrow-left'?: React.CSSProperties['left'];
  '--arrow-right'?: React.CSSProperties['right'];
  '--arrow-top'?: React.CSSProperties['top'];
  '--arrow-bottom'?: React.CSSProperties['bottom'];
}

const Popper = forwardRef<any, PopperProps & PopperCssVars>((props, ref) => {
  const { prefixCls, mountContainer: globalMountContainer } = React.useContext(ConfigContext);
  const {
    visible,
    mountContainer,
    direction,
    destroy,
    trigger,
    animationDuration,
    hasArrow,
    animationType,
    content,
    children,
    arrowPointAtCenter,
    onVisibleChange,
  } = props;

  const bem = createBEM('popper', { prefixCls });

  const isVisible = trigger === 'manual' && visible;
  const [open, setOpen] = useState(isVisible);
  const arrowRef = useRef<HTMLElement | null>(null);

  const middleware = [
    offset(({ placement }) => {
      const { width, height } = getOuterSizes(arrowRef.current);
      const side = placement.split('-')[0];
      const value = side === 'bottom' || side === 'top' ? height : width;
      return value;
    }),
    flip(),
    shift(),
  ];

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
      return {};
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
    useDismiss(context, { enabled: trigger !== 'manual' }),
  ]);

  const transitionName = getTransitionName(prefixCls, directionMap[direction!], animationType);

  useEffect(() => {
    setOpen(isVisible);
  }, [isVisible]);

  const hidden = () => {
    setOpen(false);
  };

  const toolTip = (
    <Transition
      nodeRef={floating}
      duration={animationDuration}
      visible={open}
      onLeaveEnd={hidden}
      tranisitionName={transitionName}
      destroy={destroy}
    >
      {({ style, className }, setNodeRef) => {
        return renderToContainer(
          mountContainer ?? globalMountContainer,
          <div
            {...getFloatingProps({
              ref: setNodeRef,
              className: bem([props.className, className, { [`${direction}`]: true }]),
              style: {
                ...props.style,
                ...style,
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                // animationDuration: `${animationDuration}ms`,
                transformOrigin: getTransformOrigin(context.placement),
                WebkitTransformOrigin: getTransformOrigin(context.placement),
              },
            })}
            data-popper-placement={context.placement}
          >
            <div className={bem('content')}>
              {content}
              {hasArrow && (
                <span className={bem('arrow')} ref={arrowRef} style={computeArrowStyle(context)} />
              )}
            </div>
          </div>,
        );
      }}
    </Transition>
  );

  const newRef = useMemo(() => mergeRefs([reference, (children as any).ref]), [
    reference,
    children,
  ]);

  const child = React.isValidElement(children) ? children : <span>{children}</span>;
  const childrenProps: React.RefAttributes<any> & React.HTMLAttributes<any> = {
    ...(children && (children as React.ReactElement).props),
    ...(trigger === 'contextMenu' && {
      onContextMenu: (e) => {
        e.preventDefault();
        setOpen(true);
      },
    }),
  };
  return (
    <>
      {/* {mounted && createPortal(toolTip, getMountContainer(mountContainer))} */}
      {toolTip}
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
  animationType: 'zoom-fade',
  onVisibleChange: () => {},
};

export default Popper;
