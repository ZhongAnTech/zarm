import React, { useState, useEffect, useRef, useCallback, CSSProperties, useContext } from 'react';
import { useDrag } from '@use-gesture/react';
import { createBEM } from '@zarm-design/bem';

import SwipeActionItem from './SwipeActionItem';
import Events from '../utils/events';
import type { HTMLProps } from '../utils/utilityTypes';
import { ConfigContext } from '../n-config-provider';
import type { BaseSwipeActionProps, BaseSwipeActionItemProps } from './interface';

export interface SwipeActionCssVars {
  '--za-swipe-action-background'?: React.CSSProperties['background'];
  '--za-swipe-action-border-radius'?: React.CSSProperties['borderRadius'];
  '--za-swipe-action-spacing-margin'?: React.CSSProperties['margin'];
  '--za-swipe-action-item-height'?: React.CSSProperties['height'];
  '--za-swipe-action-item-font-size'?: React.CSSProperties['fontSize'];
  '--za-swipe-action-item-font-weight'?: React.CSSProperties['fontWeight'];
  '--za-swipe-action-item-text-color'?: React.CSSProperties['color'];
  '--za-swipe-action-cancel-text-color'?: React.CSSProperties['color'];
  '--za-swipe-action-cancel-margin-top'?: React.CSSProperties['marginTop'];
}

export type SwipeActionItemProps = BaseSwipeActionItemProps & HTMLProps;

export type SwipeActionProps = BaseSwipeActionProps &
  HTMLProps & {
    style?: CSSProperties;
    actions?: BaseSwipeActionItemProps[];
    onAction?: (action: BaseSwipeActionItemProps, index: number) => void;
  };

const SwipeAction = (props) => {
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
  console.log('.>> ', props);

  const isOpen = useRef(false);
  const touchEnd = useRef(true);
  const leftRef = useRef<HTMLDivElement>();
  const rightRef = useRef<HTMLDivElement>();
  const swipeActionWrap = useRef<HTMLDivElement | null>(null);
  const { prefixCls, locale } = useContext(ConfigContext);
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
    doTransition({ offsetX: 0, duration: initialAnimationDuration });
    setTimeout(() => {
      isOpen.current = false;
      touchEnd.current = true;
    }, initialAnimationDuration);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const onCloseSwipe = (e) => {
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
              autoClose
              onClose={() => close()}
              onClick={() => action.onClick?.()}
            />
          );
        })}
      </div>
    );
  };

  const bind = useDrag(
    ({ event, movement: [x, y], elapsedTime, first, last }) => {
      if (first) {
        onDragStart();
        return;
      }

      if (last) {
        onDragEnd(x, elapsedTime);
        return;
      }

      onDragMove({
        offsetX: x,
        offsetY: y,
        event,
      });
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
        <div className={cls} ref={swipeActionWrap} {...bind()}>
          {renderButtons(leftActions, 'left', leftRef)}
          {renderButtons(rightActions, 'right', rightRef)}
          <div className={bem('content')} style={style}>
            {children}
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

SwipeAction.displayName = 'SwipeAction';

SwipeAction.defaultProps = {
  leftActions: [],
  rightActions: [],
  moveDistanceRatio: 0.5,
  moveTimeSpan: 300,
  animationDuration: 300,
  offset: 10,
  autoClose: false,
  disabled: false,
};

export default SwipeAction;
