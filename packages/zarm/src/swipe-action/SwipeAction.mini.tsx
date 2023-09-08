import { View, ViewProps } from '@tarojs/components';
import { createBEM } from '@zarm-design/bem';
import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { ConfigContext } from '../config-provider';
import { nanoid } from '../utils';
import { getRect } from '../utils/dom/dom.mini';
import { useSafeState } from '../utils/hooks';
import useDrag from '../utils/hooks/useDrag';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseSwipeActionItemProps, BaseSwipeActionProps } from './interface';
import SwipeActionItem from './SwipeActionItem.mini';

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

  const isOpen = useRef<null | string>(null);
  const pending = useRef(false);
  const leftId = useMemo(() => `swipe-action-left-${nanoid()}`, []);
  const rightId = useMemo(() => `swipe-action-right-${nanoid()}`, []);
  const { prefixCls } = useContext(ConfigContext);

  const swipeActionWrap = (ref as any) || React.useRef<SwipeActionElement>();
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

  useImperativeHandle(swipeActionWrap, () => {
    return {
      close: () => {
        close();
      },
    };
  });

  const dragStart = useRef(0);

  const close = () => {
    if (pending.current) return;
    doTransition({ offsetX: 0, duration: initialAnimationDuration });
    isOpen.current = null;
    dragStart.current = 0;
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
    return () => {
      SwipeActions = SwipeActions.filter((action) => action !== swipeActionWrap);
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

      if (offsetX > 0 && !leftActions) {
        return false;
      }

      if (offsetX < 0 && !rightActions) {
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
      from: [dragStart.current, 0],
      bounds: async () => {
        const leftWidth = (await getRect(leftId))?.width || 0;
        const rightWidth = (await getRect(rightId))?.width || 0;
        return {
          left: rightActions.length ? -rightWidth - offset! : 0,
          right: leftActions.length ? leftWidth + offset! : 0,
        };
      },
      enabled: !disabled,
      axis: 'x',
      // pointer: { touch: true },
      // preventScroll: true,
      // triggerAllEvents: true,
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
