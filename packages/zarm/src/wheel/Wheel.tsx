import BScroll, { BScrollInstance } from '@better-scroll/core';
import WheelPlugin from '@better-scroll/wheel';
import { createBEM } from '@zarm-design/bem';
import isEqual from 'lodash/isEqual';
import React, { createRef, useEffect, useRef } from 'react';
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

export interface WheelCssVars {
  '--text-color': React.CSSProperties['color'];
  '--disabled-text-color': React.CSSProperties['color'];
  '--item-height': React.CSSProperties['height'];
  '--item-rows': number;
  '--item-font-size': React.CSSProperties['fontSize'];
}

export type WheelProps = BaseWheelProps & HTMLProps<WheelCssVars>;

const Wheel: React.FC<WheelProps> = (props) => {
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
  const bem = createBEM('wheel', { prefixCls });

  const fieldNames = resolvedFieldNames(props.fieldNames);

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
    const index = scrollInstance.current?.getSelectedIndex();
    const child = dataSource?.[index];
    if (child) {
      fireValueChange(child[fieldNames.value!]);
    }
  }, []);

  useSafeLayoutEffect(() => {
    let resize: ResizeObserver | null;
    heightRef.current = wheelWrapperRef.current?.clientHeight || 0;
    const initIndex = getSelectedIndex(currentValue, dataSource);
    if (wheelWrapperRef.current) {
      scrollInstance.current = new BScroll(wheelWrapperRef.current, {
        wheel: {
          selectedIndex: initIndex,
          wheelWrapperClass: bem('content'),
          wheelItemClass: bem('item'),
        },
        probeType: 3,
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
    }

    scrollInstance.current?.on('scrollEnd', () => {
      handleScrollEnd();
    });

    return () => {
      resize?.disconnect();
      scrollInstance.current?.destroy();
    };
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
};

Wheel.displayName = 'Wheel';
Wheel.defaultProps = {
  dataSource: [],
  stopScroll: false,
};

export default Wheel;
