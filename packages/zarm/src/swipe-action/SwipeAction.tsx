import React, { useState, useEffect, useRef, useCallback, CSSProperties, useContext } from 'react';
import { useDrag } from '@use-gesture/react';
import { createBEM } from '@zarm-design/bem';

import { ConfigContext } from '../n-config-provider';
import type { BaseSwipeActionProps, BaseSwipeActionItemProps } from './interface';
import SwipeActionItem from './SwipeActionItem';
import Events from '../utils/events';
import type { HTMLProps } from '../utils/utilityTypes';

export type SwipeActionItemProps = BaseSwipeActionItemProps & HTMLProps;

export type SwipeActionProps = BaseSwipeActionProps &
  HTMLProps & {
    style?: CSSProperties;
    leftActions?: BaseSwipeActionItemProps[];
    rightActions?: BaseSwipeActionItemProps[];
    onAction?: (action: BaseSwipeActionItemProps, index: number) => void;
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
  } = props;

  const isOpen = useRef(false);
  const touchEnd = useRef(true);
  const pending = useRef(false);
  const leftRef = useRef<HTMLDivElement>();
  const rightRef = useRef<HTMLDivElement>();
  const swipeActionWrap = useRef<HTMLDivElement | null>((ref as any) || null);
  const { prefixCls } = useContext(ConfigContext);
  const [offsetLeft, setOffsetLeft] = useState<number>(0);
  const [animationDuration, setAnimationDuration] = useState(initialAnimationDuration);

  const bem = createBEM('swipe-action', { prefixCls });

  const doTransition = useCallback(
    ({ offsetX, duration }) => {
      setAnimationDuration(duration);
      setOffsetLeft(offsetX);
    },
    [offsetLeft],
  );

  const open = (offsetX) => {
    const { onOpen } = props;
    isOpen.current = true;
    doTransition({ offsetX, duration: initialAnimationDuration });
    if (typeof onOpen === 'function') {
      onOpen();
    }
  };

  const close = () => {
    const { onClose } = props;
    if (pending.current) return;
    doTransition({ offsetX: 0, duration: initialAnimationDuration });
    setTimeout(() => {
      isOpen.current = false;
      touchEnd.current = true;
      if (typeof onClose === 'function') {
        onClose();
      }
    }, initialAnimationDuration);
  };

  const onCloseSwipe = (e) => {
    // 判断type 支持异步关闭功能
    const type = e.target.parentNode?.type || null;
    if (type === 'button') {
      return;
    }

    if (!swipeActionWrap.current) {
      return;
    }
    if (isOpen.current) {
      const pNode = ((node) => {
        while (node.parentNode && node.parentNode !== document.body) {
          if (node === swipeActionWrap.current) {
            return node;
          }
          node = node.parentNode;
        }
      })(e.target);

      if (!pNode) {
        e.preventDefault();
        touchEnd.current = true;
        close();
      }
    }
  };

  useEffect(() => {
    Events.on(document.body, 'touchstart', onCloseSwipe);
    Events.on(document.body, 'click', onCloseSwipe);
    return () => {
      Events.off(document.body, 'touchstart', onCloseSwipe);
      Events.off(document.body, 'click', onCloseSwipe);
    };
  }, []);

  const onDragStart = () => {
    if (isOpen.current) {
      touchEnd.current = false;
      close();
      return;
    }
    touchEnd.current = true;
  };

  const onDragMove = ({ offsetX, offsetY, event }) => {
    if (!touchEnd.current || disabled) {
      return false;
    }
    // 拖动距离达到上限
    const btnsLeftWidth = leftRef.current && leftRef.current.offsetWidth;
    const btnsRightWidth = rightRef.current && rightRef.current.offsetWidth;
    if (offsetX! > 0 && (!btnsLeftWidth || offsetLeft >= btnsLeftWidth + offset!)) {
      return false;
    }

    if (offsetX! < 0 && (!btnsRightWidth || offsetLeft <= -btnsRightWidth - offset!)) {
      return false;
    }

    // 判断滚屏情况
    const distanceX = Math.abs(offsetX!);
    const distanceY = Math.abs(offsetY!);
    if (distanceX < 5 || (distanceX >= 5 && distanceY >= 0.3 * distanceX)) {
      return false;
    }

    if (!Events.supportsPassiveEvents) {
      event.preventDefault();
    }
    doTransition({ offsetX, duration: 0 });
    return true;
  };

  const onDragEnd = (offsetX, elapsedTime) => {
    const timeSpan = Math.floor(elapsedTime);
    const btnsLeftWidth = (leftRef.current && leftRef.current.offsetWidth) || 0;
    const btnsRightWidth = (rightRef.current && rightRef.current.offsetWidth) || 0;
    let distanceX = 0;
    let _isOpen = false;
    if (
      offsetX! / btnsLeftWidth > moveDistanceRatio! ||
      (offsetX! > 0 && timeSpan <= moveTimeSpan!)
    ) {
      distanceX = btnsLeftWidth || 0;
      _isOpen = true;
    } else if (
      offsetX! / btnsRightWidth < -moveDistanceRatio! ||
      (offsetX! < 0 && timeSpan <= moveTimeSpan!)
    ) {
      distanceX = -btnsRightWidth;
      _isOpen = true;
    }
    if (_isOpen && !isOpen.current) {
      // 打开
      open(distanceX);
    } else if (!_isOpen && isOpen.current) {
      // 关闭
      close();
    } else {
      // 还原
      doTransition({ offsetX: distanceX, duration: initialAnimationDuration });
    }
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
              onClick={async (e) => {
                pending.current = true;
                await action.onClick?.();
                pending.current = false;
                if (autoClose) {
                  close();
                }
              }}
            />
          );
        })}
      </div>
    );
  };

  const bind = useDrag(
    ({ event, movement: [x, y], elapsedTime, type }) => {
      if (type === 'touchstart') {
        onDragStart();
        return;
      }

      if (type === 'touchmove') {
        onDragMove({
          offsetX: x,
          offsetY: y,
          event,
        });
        return;
      }

      if (type === 'touchend') {
        onDragEnd(x, elapsedTime);
      }
    },
    { pointer: { touch: true } },
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
        <div className={cls}>
          {renderButtons(leftActions, 'left', leftRef)}
          {renderButtons(rightActions, 'right', rightRef)}
          <div className={bem('content')} ref={swipeActionWrap} style={style} {...bind()}>
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
