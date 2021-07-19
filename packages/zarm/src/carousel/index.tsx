import React, {
  cloneElement,
  Children,
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import type { CSSProperties } from 'react';
import classnames from 'classnames';
import type BaseCarouselProps from './interface';
import Events from '../utils/events';
import useDrag from '../useDrag';
import type { DragState, DragEvent } from '../useDrag/interface';
import { ConfigContext } from '../n-config-provider';

export interface CarouselProps extends BaseCarouselProps {
  className?: string;
  style?: CSSProperties;
}

export interface CarouselHTMLElement extends HTMLDivElement {
  onJumpTo: (index: number) => void;
  onSlideTo: (index: number) => void;
}

interface Offset {
  x: number;
  y: number;
}

interface StateProps {
  activeIndex: number;
  activeIndexChanged: boolean;
}

const Carousel = forwardRef<CarouselHTMLElement, CarouselProps>((props, ref) => {
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-carousel`;

  const {
    className,
    height,
    style,
    children,
    direction,
    loop,
    onChangeEnd,
    onChange,
    autoPlay,
    autoPlayIntervalTime,
    swipeable,
    animationDuration,
    activeIndex: propActiveIndex,
    showPagination,
    moveDistanceRatio,
    moveTimeSpan,
  } = props;

  const stateRef = useRef<StateProps>({
    activeIndex: propActiveIndex!,
    activeIndexChanged: false,
  });
  const [activeIndexState, setActiveIndexState] = useState(stateRef.current.activeIndex);
  const updateRef = useRef((state: StateProps) => {
    stateRef.current = state;
    setActiveIndexState(state.activeIndex);
  });

  const carouselRef = (ref as any) || React.createRef<CarouselHTMLElement>();
  const carouselItemsRef = useRef<HTMLDivElement>(null);

  const translateXRef = useRef(0);
  const translateYRef = useRef(0);
  const timer = useRef(0);

  // 判断当前是否在最后一页
  const isLastIndex = useCallback(() => {
    return stateRef.current.activeIndex >= children!.length - 1;
  }, [children]);

  // 判断当前是否在第一页
  const isFirstIndex = () => {
    return stateRef.current.activeIndex <= 0;
  };

  // 是否横向移动
  const isDirectionX = useCallback(() => {
    return ['left', 'right'].includes(direction!);
  }, [direction]);

  // 处理节点（首尾拼接）
  const parseItems = () => {
    if (children == null || children.length === 0) {
      return;
    }
    // 增加头尾拼接节点
    const itemList = [...children];
    const firstItem = itemList[0];
    const lastItem = itemList[itemList.length - 1];

    if (loop) {
      itemList.push(firstItem);
      itemList.unshift(lastItem);
    }

    // 节点追加后重排key
    const newItems = React.Children.map(itemList, (element: any, index) => {
      return cloneElement(element, {
        key: index,
        className: classnames(`${prefixCls}__item`, element.props.className),
      });
    });
    return newItems;
  };

  // 执行过渡动画
  const doTransition = useCallback(
    (offset: Offset, animationDurationNum: number) => {
      const dom = carouselItemsRef.current;
      let x = 0;
      let y = 0;

      if (isDirectionX()) {
        ({ x } = offset);
      } else {
        ({ y } = offset);
      }
      dom!.style.transitionDuration = `${animationDurationNum}ms`;
      dom!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    [isDirectionX],
  );

  const transitionEnd = useCallback(() => {
    const { activeIndex, activeIndexChanged } = stateRef.current;
    const dom = carouselItemsRef.current;
    const index = loop ? activeIndex + 1 : activeIndex;
    translateXRef.current = -dom!.offsetWidth * index;
    translateYRef.current = -dom!.offsetHeight * index;
    doTransition({ x: translateXRef.current, y: translateYRef.current }, 0);

    if (typeof onChangeEnd === 'function' && activeIndexChanged) {
      onChangeEnd(activeIndex);
    }
  }, [loop, doTransition, onChangeEnd]);

  // 移动到指定编号
  const onMoveTo = useCallback(
    (index: number, animationDurationNum: number) => {
      const dom = carouselItemsRef.current;
      const maxLength = children!.length;
      const previousIndex = stateRef.current.activeIndex;
      const num = loop ? 1 : 0;
      translateXRef.current = -dom!.offsetWidth * (index + num);
      translateYRef.current = -dom!.offsetHeight * (index + num);
      doTransition({ x: translateXRef.current, y: translateYRef.current }, animationDurationNum);

      if (index > maxLength - 1) {
        index = 0;
      } else if (index < 0) {
        index = maxLength - 1;
      }
      const activeIndexChanged = previousIndex !== index;

      updateRef.current({
        activeIndex: index,
        activeIndexChanged,
      });
      if (typeof onChange === 'function' && activeIndexChanged) {
        onChange(index);
      }
    },
    [children, doTransition, loop, onChange],
  );

  // 滑动到指定编号
  const onSlideTo = useCallback(
    (index: number) => {
      onMoveTo(index, animationDuration!);
    },
    [onMoveTo, animationDuration],
  );

  // 静默跳到指定编号
  const onJumpTo = useCallback(
    (index: number) => {
      onMoveTo(index, 0);
    },
    [onMoveTo],
  );
  // 暂停自动轮播
  const pauseAutoPlay = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  };

  // 自动轮播开始
  const startAutoPlay = useCallback(() => {
    if (autoPlay) {
      timer.current = window.setInterval(() => {
        const isLeftOrUpDirection = ['left', 'up'].includes(direction!);
        const activeIndex = isLeftOrUpDirection
          ? stateRef.current.activeIndex + 1
          : stateRef.current.activeIndex - 1;

        // 不循环暂停轮播
        if (!loop && (isLeftOrUpDirection ? isLastIndex() : isFirstIndex())) {
          pauseAutoPlay();
          return;
        }
        onSlideTo(activeIndex);
      }, autoPlayIntervalTime);
    }
  }, [autoPlay, autoPlayIntervalTime, direction, isLastIndex, loop, onSlideTo]);

  // 更新窗口变化的位置偏移
  const resize = useCallback(() => {
    onJumpTo(stateRef.current.activeIndex);
  }, [onJumpTo]);

  // 触屏事件
  const onDragStart = () => {
    if (!swipeable) {
      return false;
    }
    // 跳转到头尾
    const { activeIndex } = stateRef.current;
    const maxLength = children!.length;

    if (activeIndex <= 0) {
      onJumpTo(0);
    } else if (activeIndex >= maxLength - 1) {
      onJumpTo(maxLength - 1);
    }

    // 暂停自动轮播
    pauseAutoPlay();
  };

  const onDragMove = (event: DragEvent, { offsetX = 0, offsetY = 0 }: DragState) => {
    if (!swipeable) {
      return false;
    }
    const distanceX = Math.abs(offsetX);
    const distanceY = Math.abs(offsetY);

    if (isDirectionX() && (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX))) {
      return false;
    }

    if (!isDirectionX() && (distanceY < 5 || (distanceY >= 5 && distanceX >= 1.73 * distanceY))) {
      return false;
    }

    // 设置不循环的时候
    if (!loop) {
      // 在尾页时禁止拖动
      if (isLastIndex()) {
        if ((isDirectionX() && offsetX < 0) || (!isDirectionX() && offsetY < 0)) {
          return false;
        }
      }

      // 在首页时禁止拖动
      if (isFirstIndex()) {
        if ((isDirectionX() && offsetX > 0) || (!isDirectionX() && offsetY > 0)) {
          return false;
        }
      }
    }

    if (!Events.supportsPassiveEvents) {
      event.preventDefault();
    }

    doTransition({ x: translateXRef.current + offsetX, y: translateYRef.current + offsetY }, 0);
    return true;
  };

  const onDragEnd = (_event: DragEvent, { offsetX = 0, offsetY = 0, startTime }: DragState) => {
    if (!swipeable) {
      return false;
    }
    if (!offsetX && !offsetY) {
      // 恢复自动轮播
      startAutoPlay();
      return;
    }

    let { activeIndex } = stateRef.current;

    const dom = carouselItemsRef.current;
    const timeSpan = new Date().getTime() - startTime!.getTime();
    const ratio = isDirectionX()
      ? Math.abs(offsetX / dom!.offsetWidth)
      : Math.abs(offsetY / dom!.offsetHeight);

    // 判断滑动临界点
    // 1.滑动距离超过0，且滑动距离和父容器长度之比超过moveDistanceRatio
    // 2.滑动释放时间差低于moveTimeSpan
    if (ratio >= moveDistanceRatio! || timeSpan <= moveTimeSpan!) {
      const action =
        (isDirectionX() && offsetX > 0) || (!isDirectionX() && offsetY > 0) ? 'prev' : 'next';

      activeIndex = action === 'next' ? activeIndex + 1 : activeIndex - 1;
    }

    onSlideTo(activeIndex);

    // 恢复自动轮播
    startAutoPlay();
  };

  useEffect(() => {
    // 监听窗口变化
    Events.on(window, 'resize', resize);

    startAutoPlay();
    // 设置起始位置编号
    onJumpTo(propActiveIndex!);

    return () => {
      // 自动轮播结束
      pauseAutoPlay();
      // 移除监听窗口变化
      Events.off(window, 'resize', resize);
    };
  }, [onJumpTo, onSlideTo, propActiveIndex, resize, startAutoPlay, transitionEnd]);

  useEffect(() => {
    carouselRef.current.onJumpTo = onJumpTo;
    carouselRef.current.onSlideTo = onSlideTo;
  }, [carouselRef, onJumpTo, onSlideTo]);

  const renderPaginationItem = (_result, index: number) => {
    const paginationItemCls = classnames(`${prefixCls}__pagination__item`, {
      [`${prefixCls}__pagination__item--active`]: index === activeIndexState,
    });
    return (
      <div
        key={`pagination-${index}`}
        className={paginationItemCls}
        onClick={() => onSlideTo(index)}
      />
    );
  };

  const renderPagination = () => {
    return (
      showPagination && (
        <div className={`${prefixCls}__pagination`}>
          {Children.map(children, renderPaginationItem)}
        </div>
      )
    );
  };
  const getDragProps = useDrag({ onDragStart, onDragMove, onDragEnd });
  const directionText = isDirectionX() ? 'horizontal' : 'vertical';
  const cls = classnames(prefixCls, className, `${prefixCls}--${directionText}`);

  const content = () => {
    const items = parseItems();
    const itemsStyle: CSSProperties = {};
    if (!isDirectionX()) {
      itemsStyle.height = height;
    }
    return (
      <div
        ref={carouselItemsRef}
        className={`${prefixCls}__items`}
        onTransitionEnd={transitionEnd}
        style={itemsStyle}
      >
        {items}
      </div>
    );
  };
  return (
    <div className={cls} style={style} ref={carouselRef} {...getDragProps}>
      {content()}
      {renderPagination()}
    </div>
  );
});

Carousel.displayName = 'Carousel';

Carousel.defaultProps = {
  direction: 'left',
  height: 160,
  loop: false,
  activeIndex: 0,
  animationDuration: 500,
  swipeable: true,
  autoPlay: false,
  autoPlayIntervalTime: 3000,
  moveDistanceRatio: 0.5,
  moveTimeSpan: 300,
  showPagination: true,
};

export default Carousel;
