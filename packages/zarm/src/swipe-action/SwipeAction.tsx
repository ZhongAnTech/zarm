import { useDrag } from '@use-gesture/react';
import { createBEM } from '@zarm-design/bem';
import React, { useCallback, useContext, useRef } from 'react';
import { ConfigContext } from '../config-provider';
import useClickAway from '../use-click-away';
import { useSafeState } from '../utils/hooks';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseSwipeActionItemProps, BaseSwipeActionProps } from './interface';
import SwipeActionItem from './SwipeActionItem';

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

  const isOpen = useRef<null | string>(null);
  const pending = useRef(false);
  const leftRef = useRef<HTMLDivElement>();
  const rightRef = useRef<HTMLDivElement>();
  const swipeActionWrap = useRef<HTMLDivElement | null>((ref as any) || null);
  const { prefixCls } = useContext(ConfigContext);
  const [offsetLeft, setOffsetLeft] = useSafeState<number>(0);
  const [animationDuration, setAnimationDuration] = useSafeState(initialAnimationDuration);
  const bem = createBEM('swipe-action', { prefixCls });

  const doTransition = useCallback(
    ({ offsetX, duration }) => {
      setAnimationDuration(duration);
      setOffsetLeft(offsetX);
    },
    [offsetLeft],
  );

  useClickAway(
    swipeActionWrap.current,
    () => {
      close();
    },
    'ontouchstart' in window ? 'touchstart' : 'mousedown',
  );

  const dragStart = useRef(0);

  const close = () => {
    if (pending.current) return;
    doTransition({ offsetX: 0, duration: initialAnimationDuration });
    isOpen.current = null;
    dragStart.current = 0;
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

  const dragging = useRef(false);
  const btnsLeftWidth = leftRef?.current?.offsetWidth || 0;
  const btnsRightWidth = rightRef?.current?.offsetWidth || 0;

  const bind = useDrag(
    (state) => {
      const [offsetX] = state.offset;
      if (
        (isOpen.current === 'right' && offsetX < 0) ||
        (isOpen.current === 'left' && offsetX > 0)
      ) {
        return false;
      }
      if (state.down) {
        dragging.current = true;
      }
      if (!dragging.current) return;
      dragStart.current = offsetX;

      if (offsetX > 0 && !leftRef?.current) {
        return false;
      }

      if (offsetX < 0 && !rightRef?.current) {
        return false;
      }

      if (state.last) {
        const timeSpan = Math.floor(state.elapsedTime);
        let distanceX = 0;
        let _isOpen = false;
        if (
          btnsLeftWidth > 0 &&
          (offsetX / btnsLeftWidth > moveDistanceRatio! ||
            (offsetX > 0 && timeSpan <= moveTimeSpan!))
        ) {
          distanceX = btnsLeftWidth;
          _isOpen = true;
        } else if (
          (btnsRightWidth > 0 && offsetX / btnsRightWidth < -moveDistanceRatio!) ||
          (offsetX < 0 && timeSpan <= moveTimeSpan!)
        ) {
          distanceX = -btnsRightWidth;
          _isOpen = true;
        }
        doTransition({ offsetX: distanceX, duration: initialAnimationDuration });

        if (_isOpen) {
          // 打开
          isOpen.current = distanceX > 0 ? 'left' : 'right';
          onOpen?.();
        } else {
          // 还原
          close();
        }
        window.setTimeout(() => {
          dragging.current = false;
        });
      } else {
        doTransition({ offsetX, duration: 0 });
      }
    },
    {
      from: () => [dragStart.current, 0],
      bounds: () => {
        const leftWidth = leftRef?.current?.offsetWidth || 0;
        const rightWidth = rightRef?.current?.offsetWidth || 0;
        return {
          left: -rightWidth - offset!,
          right: leftWidth + offset!,
        };
      },
      enabled: !disabled,
      axis: 'x',
      pointer: { touch: true },
      preventScroll: true,
      triggerAllEvents: true,
    },
  );

  const style = {
    WebkitTransitionDuration: `${animationDuration}ms`,
    transitionDuration: `${animationDuration}ms`,
    WebkitTransform: `translate3d(${offsetLeft}px, 0, 0)`,
    transform: `translate3d(${offsetLeft}px, 0, 0)`,
  };

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
