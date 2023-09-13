import { useDrag } from '@use-gesture/react';
import { createBEM } from '@zarm-design/bem';
import React, { useContext, useRef } from 'react';
import { ConfigContext } from '../config-provider';
import useClickAway from '../use-click-away';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseSwipeActionItemProps, BaseSwipeActionProps } from './interface';
import SwipeActionItem from './SwipeActionItem';
import useSwipe from './useSwipe';

export interface SwipeActionCssVars {
  '--background'?: React.CSSProperties['background'];
}

export type SwipeActionItemProps = HTMLProps & BaseSwipeActionItemProps;

export type SwipeActionProps = BaseSwipeActionProps &
  React.PropsWithChildren<HTMLProps<SwipeActionCssVars>> & {
    leftActions?: SwipeActionItemProps[];
    rightActions?: SwipeActionItemProps[];
  };

const SwipeAction = React.forwardRef<HTMLDivElement, SwipeActionProps>((props, ref) => {
  const {
    children,
    className,
    leftActions,
    rightActions,
    moveDistanceRatio,
    moveTimeSpan,
    animationDuration: initialAnimationDuration,
    offset,
    autoClose,
    disabled,
    onClose,
    onOpen,
  } = props;

  // const isOpen = useRef<null | string>(null);
  const pending = useRef(false);
  const leftRef = useRef<HTMLDivElement>();
  const rightRef = useRef<HTMLDivElement>();
  const swipeActionWrap = useRef<HTMLDivElement | null>((ref as any) || null);
  const { prefixCls } = useContext(ConfigContext);

  const { isOpen, style, doTransition, onSwipe, afterClose, dragStart, dragging } = useSwipe();
  const bem = createBEM('swipe-action', { prefixCls });

  useClickAway(
    swipeActionWrap.current,
    () => {
      close();
    },
    'ontouchstart' in window ? 'touchstart' : 'mousedown',
  );

  // const dragStart = useRef(0);

  const close = () => {
    if (pending.current) return;
    doTransition(0, initialAnimationDuration);
    afterClose();
    //  dragStart.current = 0;
  };

  const renderButtons = (actions, direction, refs) => {
    if (!actions || actions.length === 0) {
      return;
    }

    const cls = bem('actions', [{ [`${direction}`]: true }]);

    return (
      <div className={cls} ref={refs}>
        {actions.map((action, index) => {
          return (
            <SwipeActionItem
              {...action}
              key={+index}
              onClick={async () => {
                pending.current = true;
                await action.onClick?.();
                pending.current = false;
                if (autoClose) {
                  close?.();
                }
              }}
            />
          );
        })}
      </div>
    );
  };

  const btnsLeftWidth = leftRef?.current?.offsetWidth || 0;
  const btnsRightWidth = rightRef?.current?.offsetWidth || 0;

  const bind = useDrag(
    (state) => {
      onSwipe(state, {
        moveDistanceRatio,
        moveTimeSpan,
        leftActions,
        rightActions,
        btnsLeftWidth,
        btnsRightWidth,
        onOpen,
        animationDuration: initialAnimationDuration,
        close,
      });
    },
    {
      from: () => [dragStart.current, 0],
      bounds: () => {
        const leftWidth = leftRef?.current?.offsetWidth || 0;
        const rightWidth = rightRef?.current?.offsetWidth || 0;
        return {
          left: leftActions ? -rightWidth - offset! : 0,
          right: rightActions ? leftWidth + offset! : 0,
        };
      },
      enabled: !disabled,
      axis: 'x',
      pointer: { touch: true },
      preventScroll: true,
      triggerAllEvents: true,
    },
  );

  const cls = bem([className]);

  return (
    <>
      {leftActions || rightActions ? (
        <div ref={swipeActionWrap} className={cls} style={props.style} {...bind()}>
          {renderButtons(leftActions, 'left', leftRef)}
          {renderButtons(rightActions, 'right', rightRef)}
          <div
            className={bem('content')}
            style={style}
            onTransitionEnd={() => !isOpen.current && onClose?.()}
            onClick={(e) => {
              if (isOpen.current && !dragging.current) {
                e.preventDefault();
                e.stopPropagation();
                close();
              }
            }}
          >
            {children}
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
});

SwipeAction.displayName = 'SwipeAction';

SwipeAction.defaultProps = {
  leftActions: [],
  rightActions: [],
  moveDistanceRatio: 0.5,
  moveTimeSpan: 300,
  animationDuration: 300,
  offset: 10,
  autoClose: true,
  disabled: false,
};

export default SwipeAction;
