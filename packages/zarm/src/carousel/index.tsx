import React, {
  cloneElement,
  Children,
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useImperativeHandle,
} from 'react';
import type { CSSProperties } from 'react';
import { createBEM } from '@zarm-design/bem';
import { useDrag } from '@use-gesture/react';
import { useEventListener } from 'ahooks';
import type { BaseCarouselProps } from './interface';
import Events from '../utils/events';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';

export interface CarouselCssVars {
  '--pagination-margin'?: React.CSSProperties['right' | 'bottom'];
  '--pagination-item-width'?: React.CSSProperties['width'];
  '--pagination-item-height'?: React.CSSProperties['height'];
  '--pagination-item-border-radius'?: React.CSSProperties['borderRadius'];
  '--pagination-item-spacing'?: React.CSSProperties['marginRight'];
  '--pagination-item-background'?: React.CSSProperties['background'];
  '--pagination-item-active-background'?: React.CSSProperties['background'];
}

export type CarouselProps = BaseCarouselProps & HTMLProps<CarouselCssVars>;

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
  const { prefixCls } = React.useContext(ConfigContext);

  const bem = createBEM('carousel', { prefixCls });

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

  const isVertical = direction === 'vertical';

  const carouselRef = (ref as any) || React.createRef<CarouselHTMLElement>();
  const carouselDomRef = useRef<HTMLDivElement>(null);
  const carouselItemsRef = useRef<HTMLDivElement>(null);

  const translateXRef = useRef(0);
  const translateYRef = useRef(0);

  const count = useMemo(() => Children.count(children), [children]);

  // 处理节点（首尾拼接）
  const carouselItems = useMemo(() => {
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
        className: bem('item', [element.props.className]),
      });
    });
    return newItems;
  }, [children]);

  // 执行过渡动画
  const doTransition = useCallback(
    (offset: Offset, animationDurationNum: number) => {
      const dom = carouselItemsRef.current;
      let x = 0;
      let y = 0;

      if (!isVertical) {
        ({ x } = offset);
      } else {
        ({ y } = offset);
      }
      dom!.style.transitionDuration = `${animationDurationNum}ms`;
      dom!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    [isVertical],
  );

  const onMoving = useRef(false);

  const transitionEnd = useCallback(() => {
    onMoving.current = false;
    const { activeIndex, activeIndexChanged } = stateRef.current;
    const dom = carouselItemsRef.current;
    const index = loop ? activeIndex + 1 : activeIndex;
    translateXRef.current = -dom!.offsetWidth * index;
    translateYRef.current = -dom!.offsetHeight * index;
    doTransition({ x: translateXRef.current, y: translateYRef.current }, 0);
    if (activeIndexChanged) {
      onChangeEnd?.(activeIndex);
    }
  }, [loop, doTransition, onChangeEnd]);

  // 移动到指定编号
  const onMoveTo = useCallback(
    (index: number, animationDurationNum: number) => {
      const dom = carouselItemsRef.current;
      const previousIndex = stateRef.current.activeIndex;
      const activeIndexChanged = previousIndex !== index;
      const num = loop ? 1 : 0;
      translateXRef.current = -dom!.offsetWidth * (index + num);
      translateYRef.current = -dom!.offsetHeight * (index + num);
      doTransition(
        { x: translateXRef.current, y: translateYRef.current },
        animationDurationNum
      );

      if (index > count - 1) {
        index = 0;
      } else if (index < 0) {
        index = count - 1;
      }

      updateRef.current({
        activeIndex: index,
        activeIndexChanged,
      });
      if (activeIndexChanged) {
        onChange?.(index);
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

  // 更新窗口变化的位置偏移
  const resize = useCallback(() => {
    onJumpTo(stateRef.current.activeIndex);
  }, [onJumpTo]);

  const intervalRef = useRef<number>();

  const bind = useDrag(
    (state) => {
      let { activeIndex } = stateRef.current;
      if (onMoving.current) {
        if (activeIndex <= 0) {
          onJumpTo(0);
        } else if (activeIndex >= count - 1) {
          onJumpTo(count - 1);
        }
        onMoving.current = false;
      }
      if (!state.intentional) {
        return false;
      };
      intervalRef.current && window.clearInterval(intervalRef.current);

      const { offset, elapsedTime } = state;

      const [offsetX, offsetY] = offset;
      const index = isVertical ? 1 : 0;
      if (!offset[index]) {
        return false;
      }

      const action = (!isVertical && offsetX > 0) || (isVertical && offsetY > 0) ? 'prev' : 'next';
      if (
        !loop &&
        ((action === 'prev' && activeIndex <= 0) || (action === 'next' && activeIndex >= count - 1))
      ) {
        return false;
      }
      if (state.last) {
        const dom = carouselItemsRef.current;

        const ratio = !isVertical
          ? Math.abs(offsetX / dom!.offsetWidth)
          : Math.abs(offsetY / dom!.offsetHeight);
        // 判断滑动临界点
        // 1.滑动距离超过0，且滑动距离和父容器长度之比超过moveDistanceRatio
        // 2.滑动释放时间差低于moveTimeSpan
        if (ratio >= moveDistanceRatio! || elapsedTime <= moveTimeSpan!) {
          activeIndex = action === 'next' ? activeIndex + 1 : activeIndex - 1;
        }
        if (loop && (activeIndex >= count - 1 || activeIndex <= 1)) {
          onMoving.current = true;
        }
        onSlideTo(activeIndex);
        return false;
      }
      doTransition(
        { x: translateXRef.current + offset[0], y: translateYRef.current + offset[1] },
        0,
      );
    },
    {
      from: () => [0, 0],
      enabled: swipeable,
      axis: isVertical ? 'y' : 'x',
      pointer: { touch: true },
      preventScroll: !isVertical,
      triggerAllEvents: true,
    },
  );

  // 单独导出onTouchStart事件，通过addEventListener touchstart的方式执行useDrag返回的onTouchStart逻辑，无差别消除事件不执行的影响

  // React v18 版本，当root容器高度被设置为 100% 时，子元素数量过多，溢出父元素时，在 IOS端 onTouchStart合成事件不会被触发（具体的为TouchEvent和PoniterEvent不会被触发）
  const { onTouchStart, ...restBind } = bind()

  // 监听原生touchstart，可以在ios部分设备下解决未在可视区域内的元素无法触发onTouchStart事件的问题
  useEventListener('touchstart', onTouchStart, {
    target: carouselDomRef
  })

  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    intervalRef.current = window.setInterval(() => {
      !onMoving.current && onSlideTo(stateRef.current.activeIndex + 1);
    }, autoPlayIntervalTime);
    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayIntervalTime, loop, onSlideTo, stateRef.current.activeIndex]);

  useEffect(() => {
    // 监听窗口变化
    Events.on(window, 'resize', resize);
    // 设置起始位置编号
    onJumpTo(propActiveIndex!);

    return () => {
      // 移除监听窗口变化
      Events.off(window, 'resize', resize);
    };
  }, [onJumpTo, onSlideTo, propActiveIndex, resize, transitionEnd]);

  useImperativeHandle(carouselRef, () => {
    return {
      onJumpTo: (index: number) => {
        onJumpTo(index);
      },
      onSlideTo: (index: number) => {
        onSlideTo(index);
      },
    };
  });

  const pagination = useMemo(() => {
    if (!showPagination) return null;
    const paginationItems = Children.map(children, (_child: React.ReactNode, index: number) => {
      return (
        <div
          key={`pagination-${+index}`}
          className={bem('pagination__item', [
            {
              active: index === activeIndexState,
            },
          ])}
          onClick={() => onSlideTo(index)}
        />
      );
    });

    return <div className={bem('pagination')}>{paginationItems}</div>;
  }, [showPagination, children, activeIndexState]);

  const cls = bem([
    {
      horizontal: !isVertical,
      vertical: isVertical,
    },
    className,
  ]);

  const itemsStyle: CSSProperties = {};
  if (isVertical) {
    itemsStyle.height = height;
  }

  return (
    <div className={cls} style={style} ref={carouselRef} {...restBind}>
      <div
        ref={el => {
          carouselItemsRef.current = el;
          carouselDomRef.current = el;
        }}
        className={bem('items')}
        onTransitionEnd={transitionEnd}
        style={itemsStyle}
      >
        {carouselItems}
      </div>
      {pagination}
    </div>
  );
});

Carousel.displayName = 'Carousel';

Carousel.defaultProps = {
  direction: 'horizontal',
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
