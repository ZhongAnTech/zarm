import { View, ViewProps } from '@tarojs/components';
import { createBEM } from '@zarm-design/bem';
import React, { useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import Taro from '@tarojs/taro';
import { ConfigContext } from '../config-provider';
import { nanoid } from '../utils';
import { getRect } from '../utils/dom/dom.mini';
import useDrag from '../utils/hooks/useDrag';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseSwipeActionItemProps, BaseSwipeActionProps } from './interface';
import SwipeActionItem from './SwipeActionItem.mini';
import useSwipe from './useSwipe';

export interface SwipeActionCssVars {
  '--background'?: React.CSSProperties['background'];
}

export interface SwipeActionElement extends ViewProps {
  close: () => void;
}

export type SwipeActionItemProps = ViewProps & BaseSwipeActionItemProps;

export type SwipeActionProps = BaseSwipeActionProps &
  React.PropsWithChildren<HTMLProps<SwipeActionCssVars>> & {
    leftActions?: SwipeActionItemProps[];
    rightActions?: SwipeActionItemProps[];
  };

let SwipeActions = [];

const SwipeAction = React.forwardRef<SwipeActionElement, SwipeActionProps>((props, ref) => {
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

  const { isOpen, style, doTransition, onSwipe, afterClose } = useSwipe({ animationDuration: initialAnimationDuration });
  // const isOpen = useRef<null | string>(null);
  const pending = useRef(false);
  const leftId = useMemo(() => `swipe-action-left-${nanoid()}`, []);
  const rightId = useMemo(() => `swipe-action-right-${nanoid()}`, []);
  const { prefixCls } = useContext(ConfigContext);

  const swipeActionWrap = React.useRef<SwipeActionElement | null>((ref as any) || null);
  const bem = createBEM('swipe-action', { prefixCls });

  useImperativeHandle(swipeActionWrap, () => {
    return {
      close: () => {
        close();
      },
    };
  });

  const close = () => {
    if (pending.current) return;
    doTransition(0, initialAnimationDuration);
    afterClose();
  };

  const renderButtons = (actions, direction, id) => {
    if (!actions || actions.length === 0) {
      return;
    }

    const cls = bem('actions', [{ [`${direction}`]: true }]);

    return (
      <View className={cls} id={id}>
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
      </View>
    );
  };

  let btnsLeftWidth = 0;
  let btnsRightWidth = 0;
  const computeBtnSize = async () => {
    btnsLeftWidth = (await getRect(leftId))?.width;
    btnsRightWidth = (await getRect(rightId))?.width;
  };

  const dragging = useRef(false);

  useEffect(() => {
    computeBtnSize();
    SwipeActions.push(swipeActionWrap);
    Taro.onWindowResize(computeBtnSize);
    return () => {
      SwipeActions = SwipeActions.filter((action) => action !== swipeActionWrap);
      Taro.offWindowResize(computeBtnSize);
    };
  }, []);

  const closeOther = () => {
    SwipeActions.filter((action) => action !== swipeActionWrap).map((action) =>
      action?.current?.close(),
    );
  };

  const bind = useDrag(
    (state) => {
      if (state.first) {
        closeOther();
      }
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
      bounds: async () => {
        return {
          left: rightActions.length ? -btnsRightWidth - offset! : 0,
          right: leftActions.length ? btnsLeftWidth + offset! : 0,
        };
      },
      enabled: !disabled,
      axis: 'x',
      // pointer: { touch: true },
      // preventScroll: true,
      // triggerAllEvents: true,
    },
  );

  const cls = bem([className]);

  return (
    <>
      {leftActions || rightActions ? (
        <View className={cls} style={props.style} {...bind()} ref={swipeActionWrap}>
          {renderButtons(leftActions, 'left', leftId)}
          {renderButtons(rightActions, 'right', rightId)}
          <View
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
          </View>
        </View>
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
