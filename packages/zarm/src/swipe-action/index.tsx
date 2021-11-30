import React, { useState, useEffect, forwardRef, cloneElement, useRef } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import Events from '../utils/events';
import Drag from '../drag';
import { BaseSwipeActionProps } from './interface';
export interface SwipeActionProps extends BaseSwipeActionProps {
  prefixCls?: string;
  className?: string;
}

const SwipeAction = forwardRef<HTMLDivElement, SwipeActionProps>((props, ref) => {
  const {
    children,
    className,
    left: leftButton,
    right: rightButton,
    moveDistanceRatio = 0.5,
    moveTimeSpan = 300,
    animationDuration: propsAnimationDuration = 300,
    offset = 10,
    autoClose = false,
    disabled = false,
  } = props;

  let isOpen = false;
  let touchEnd = true;

  const leftRef = useRef<HTMLDivElement>();
  const rightRef = useRef<HTMLDivElement>();
  const swipeAction = (ref as any) || useRef<HTMLDivElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-swipe-action`;

  const [offsetLeft, setOffsetLeft] = useState<number>(0);
  const [animationDuration, setAnimationDuration] = useState(propsAnimationDuration);

  useEffect(() => {
    Events.on(document.body, 'touchstart', onCloseSwipe);
    Events.on(document.body, 'click', onCloseSwipe);
  }, []);

  useEffect(() => {
    Events.off(document.body, 'touchstart', onCloseSwipe);
    Events.off(document.body, 'click', onCloseSwipe);
  }, []);

  const onCloseSwipe = (e) => {
    if (!swipeAction) {
      return;
    }

    if (isOpen) {
      const pNode = ((node) => {
        while (node.parentNode && node.parentNode !== document.body) {
          if (node === swipeAction) {
            return node;
          }
          node = node.parentNode;
        }
      })(e.target);

      if (!pNode) {
        e.preventDefault();
        touchEnd = true;
        close();
      }
    }
  };

  const onDragStart = () => {
    if (isOpen) {
      touchEnd = false;
      close();
    }
    touchEnd = true;
  };

  const onDragMove = (event, { offsetX, offsetY }) => {
    if (!touchEnd || disabled) {
      return false;
    }

    // 拖动距离达到上限
    const btnsLeftWidth = leftRef.current && leftRef.current.offsetWidth;
    const btnsRightWidth = rightRef.current && rightRef.current.offsetWidth;
    if (offsetX > 0 && (!btnsLeftWidth || offsetLeft >= btnsLeftWidth + offset)) {
      return false;
    }

    if (offsetX < 0 && (!btnsRightWidth || offsetLeft <= -btnsRightWidth - offset)) {
      return false;
    }

    // 判断滚屏情况
    const distanceX = Math.abs(offsetX);
    const distanceY = Math.abs(offsetY);
    if (distanceX < 5 || (distanceX >= 5 && distanceY >= 0.3 * distanceX)) {
      return false;
    }

    if (!Events.supportsPassiveEvents) {
      event.preventDefault();
    }
    doTransition({ offsetLeft: offsetX, animationDuration: 0 });
    return true;
  };

  const doTransition = ({ offsetLeft, animationDuration }) => {
    setOffsetLeft(offsetLeft);
    setAnimationDuration(animationDuration);
  };

  const onDragEnd = (_event, { offsetX, startTime }) => {
    const timeSpan = new Date().getTime() - startTime.getTime();
    const btnsLeftWidth = (leftRef.current && leftRef.current.offsetWidth) || 0;
    const btnsRightWidth = (rightRef.current && rightRef.current.offsetWidth) || 0;

    let distanceX = 0;
    let _isOpen = false;

    if (offsetX / btnsLeftWidth > moveDistanceRatio || (offsetX > 0 && timeSpan <= moveTimeSpan)) {
      distanceX = btnsLeftWidth || 0;
      _isOpen = true;
    } else if (
      offsetX / btnsRightWidth < -moveDistanceRatio ||
      (offsetX < 0 && timeSpan <= moveTimeSpan)
    ) {
      distanceX = -btnsRightWidth;
      _isOpen = true;
    }

    if (_isOpen && !isOpen) {
      // 打开
      open(distanceX);
    } else if (!_isOpen && isOpen) {
      // 关闭
      close();
    } else {
      // 还原
      doTransition({ offsetLeft: distanceX, animationDuration });
    }
  };

  const open = (offsetLeft) => {
    const { onOpen } = props;
    isOpen = true;
    doTransition({ offsetLeft, animationDuration });
    if (typeof onOpen === 'function') {
      onOpen();
    }
  };

  const close = () => {
    const { onClose } = props;
    isOpen = false;
    doTransition({ offsetLeft: 0, animationDuration });
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const renderButton = (button, index) => {
    return cloneElement(button, {
      key: +index,
      onClick: (e) => {
        const { onClick } = button.props;
        onClick && onClick(e);
        if (autoClose) {
          close();
        }
      },
    });
  };

  const renderButtons = (buttons, direction, refs) => {
    if (!buttons || buttons.length === 0) {
      return;
    }

    const cls = classnames(`${prefixCls}__actions`, `${prefixCls}__actions--${direction}`);
    return (
      <div className={cls} ref={refs}>
        {buttons.map(renderButton)}
      </div>
    );
  };

  const style = {
    WebkitTransitionDuration: `${animationDuration}ms`,
    transitionDuration: `${animationDuration}ms`,
    WebkitTransform: `translate3d(${offsetLeft}px, 0, 0)`,
    transform: `translate3d(${offsetLeft}px, 0, 0)`,
  };

  const cls = classnames(prefixCls, className);

  return (
    <>
      leftButton || rightButton ? (
      <div className={cls} ref={swipeAction}>
        {renderButtons(leftButton, 'left', leftRef)}
        {renderButtons(rightButton, 'right', rightRef)}
        <Drag onDragStart={onDragStart} onDragMove={onDragMove} onDragEnd={onDragEnd}>
          <div className={`${prefixCls}__content`} style={style}>
            {children}
          </div>
        </Drag>
      </div>
      ) : ( children );
    </>
  );
});

SwipeAction.displayName = 'SwipeAction';

export default SwipeAction;
