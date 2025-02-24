import BScroll, { BScrollInstance } from '@better-scroll/core';
import WheelPlugin from '@better-scroll/wheel';
import { createBEM } from '@zarm-design/bem';
import isEqual from 'lodash/isEqual';
import React, {
  createRef,
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { ConfigContext } from '../config-provider';
import { resolvedFieldNames } from '../picker-view/utils';
import { useEventCallback, usePrevious, useSafeLayoutEffect } from '../utils/hooks';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseWheelProps, WheelItem, WheelValue } from './interface';

BScroll.use(WheelPlugin);

const getValue = (props: Omit<WheelProps, 'itemRender'>) => {
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  if ('value' in props) {
    return props.value;
  }
  if (Array.isArray(props.dataSource) && props.dataSource[0] && props.fieldNames?.value) {
    return props.dataSource[0][props.fieldNames?.value];
  }
};

export interface WheelRef {
  scrollInstance: RefObject<BScrollInstance>;
  getCurrentValue: () => WheelValue;
  scrollTo: (index: number) => void;
}

export interface WheelCssVars {
  '--text-color': React.CSSProperties['color'];
  '--disabled-text-color': React.CSSProperties['color'];
  '--item-height': React.CSSProperties['height'];
  '--item-rows': number;
  '--item-font-size': React.CSSProperties['fontSize'];
}

export type WheelProps = BaseWheelProps & HTMLProps<WheelCssVars>;

const Wheel = forwardRef<WheelRef, WheelProps>((props, ref) => {
  const { className, value, defaultValue, dataSource, disabled, stopScroll, itemRender, onChange } =
    props;

  const scrollInstance = useRef<BScrollInstance | null>(null);
  const wheelWrapperRef = createRef<HTMLDivElement>();
  const currentValue = getValue(props);
  const prevValue = usePrevious(value);
  const prevDataSource = usePrevious(dataSource);
  const prevStopScroll = usePrevious(stopScroll);
  const { prefixCls } = React.useContext(ConfigContext);
  const heightRef = React.useRef(0);
  const currentIndexRef = useRef(0);
  const bem = createBEM('wheel', { prefixCls });

  const fieldNames = resolvedFieldNames(props.fieldNames);

  const wheelMethods = useMemo(
    () => ({
      scrollInstance,
      getCurrentValue: () => {
        if (!scrollInstance.current) return currentValue;
        const index = currentIndexRef.current;
        const child = dataSource?.[index];
        return child ? child[fieldNames.value!] : currentValue;
      },
      scrollTo: (index: number) => {
        scrollInstance.current?.wheelTo(index);
      },
    }),
    [currentValue, dataSource, fieldNames.value],
  );

  useImperativeHandle(ref, () => wheelMethods, [wheelMethods]);

  const getSelectedIndex = (
    changedValue?: WheelValue,
    newDataSource?: Array<WheelItem>,
  ): number => {
    let index = 0;
    if (newDataSource) {
      newDataSource.some((item, i) => {
        if (item[fieldNames.value!] === changedValue) {
          index = i;
          return true;
        }
        return false;
      });
    }
    return index;
  };

  const fireValueChange = (changedValue: WheelValue) => {
    if (changedValue === currentValue) {
      return;
    }
    onChange?.(changedValue);
  };

  const handleScrollEnd = useEventCallback(() => {
    const index = scrollInstance.current?.getSelectedIndex() || 0;
    currentIndexRef.current = index;
    const child = dataSource?.[index];
    if (child) {
      fireValueChange(child[fieldNames.value!]);
    }
  }, []);

  useSafeLayoutEffect(() => {
    let resize: ResizeObserver | null;
    let rafId: number;

    heightRef.current = wheelWrapperRef.current?.clientHeight || 0;
    const initIndex = getSelectedIndex(currentValue, dataSource);
    currentIndexRef.current = initIndex;

    if (wheelWrapperRef.current) {
      scrollInstance.current = new BScroll(wheelWrapperRef.current, {
        wheel: {
          selectedIndex: initIndex,
          wheelWrapperClass: bem('content'),
          wheelItemClass: bem('item'),
          momentum: true,
          rotate: 25,
          swipeTime: 300,
        },
        probeType: 3,
        momentum: true,
        momentumLimitTime: 50,
        momentumLimitDistance: 3,
        swipeTime: 300,
        swipeBounceTime: 100,
        deceleration: 0.015,
      });

      if (scrollInstance.current.scroller?.wrapper) {
        resize = new ResizeObserver((entries) => {
          const [entry] = entries || [];
          if (entry.contentRect.height === heightRef.current) return;
          heightRef.current = entry.contentRect.height;
          scrollInstance.current?.refresh();
        });
        resize.observe(scrollInstance.current.scroller.wrapper);
      }

      const handleScroll = () => {
        if (!scrollInstance.current) return;
        const { y } = scrollInstance.current;
        const itemHeight = heightRef.current / 5;
        const index = Math.round(Math.abs(y) / itemHeight);

        if (index >= 0 && index < dataSource!.length) {
          currentIndexRef.current = index;
        }
      };

      const onScroll = () => {
        rafId = requestAnimationFrame(handleScroll);
      };

      scrollInstance.current.on('scroll', onScroll);

      return () => {
        cancelAnimationFrame(rafId);
        resize?.disconnect();
        scrollInstance.current?.destroy();
      };
    }
    return undefined;
  }, []);

  useEffect(() => {
    disabled && scrollInstance.current?.disable();
  }, [disabled]);

  useEffect(() => {
    if (isEqual(prevDataSource, dataSource)) return;
    scrollInstance.current?.refresh();

    const targetIndex = dataSource?.findIndex((item) => item[fieldNames.value] === value);
    if (targetIndex >= 0) return;
    handleScrollEnd();
  }, [dataSource, fieldNames, value]);

  useEffect(() => {
    const oldIndex = getSelectedIndex(prevValue, prevDataSource);
    const newIndex = getSelectedIndex(value, dataSource);
    if (newIndex !== oldIndex) {
      scrollInstance.current?.wheelTo(newIndex);
    }

    if (stopScroll && prevStopScroll !== stopScroll) {
      scrollInstance.current?.stop();
    }
  }, [value, defaultValue, dataSource, stopScroll, fieldNames.value]);

  const items = dataSource!.map((item, index) => {
    const itemCls = bem('item', [
      {
        selected: currentValue === item[fieldNames.value!],
        disabled,
      },
    ]);

    return (
      <div key={+index} className={itemCls}>
        {itemRender?.(item) || item?.[fieldNames.label]}
      </div>
    );
  });

  return (
    <div className={bem([className])} ref={wheelWrapperRef}>
      <div className={bem('content')}>{items}</div>
    </div>
  );
});

Wheel.displayName = 'Wheel';
Wheel.defaultProps = {
  dataSource: [],
  stopScroll: false,
};

export default Wheel;
