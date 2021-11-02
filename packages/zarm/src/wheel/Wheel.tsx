import React, { createRef, useEffect, useRef } from 'react';
import classnames from 'classnames';
import BScroll, { BScrollInstance } from 'better-scroll';
import isEqual from 'lodash/isEqual';
import { isArray } from '../utils/validate';
import { usePrevious, useEventCallback } from '../utils/hooks';
import type { BaseWheelProps, WheelItem, WheelValue } from './interface';
import { ConfigContext } from '../n-config-provider';

const getValue = (props: Omit<WheelProps, 'itemRender'>) => {
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  if ('value' in props) {
    return props.value;
  }
  if (isArray(props.dataSource) && props.dataSource[0] && props.valueMember) {
    return props.dataSource[0][props.valueMember];
  }
};

export interface WheelProps extends BaseWheelProps {
  className?: string;
}

const Wheel = (props: WheelProps) => {
  const {
    className,
    value,
    defaultValue,
    valueMember,
    dataSource,
    disabled,
    stopScroll,
    itemRender,
    onChange,
  } = props;

  const scrollInstance = useRef<BScrollInstance | null>(null);
  const wheelWrapperRef = createRef<HTMLDivElement>();
  const currentValue = getValue(props);
  const prevValue = usePrevious(value);
  const prevDataSource = usePrevious(dataSource);
  const prevStopScroll = usePrevious(stopScroll);
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-wheel`;

  const getSelectedIndex = (newValue?: WheelValue, newDataSource?: Array<WheelItem>): number => {
    let index = 0;
    if (newDataSource) {
      newDataSource.some((item, i) => {
        if (item[valueMember!] === newValue) {
          index = i;
          return true;
        }
        return false;
      });
    }
    return index;
  };

  const fireValueChange = (newValue: any) => {
    if (newValue === currentValue) {
      return;
    }
    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  const handleScrollEnd = useEventCallback(() => {
    const index = scrollInstance.current?.getSelectedIndex();
    const child = dataSource[index];
    if (child) {
      fireValueChange(child[valueMember!]);
    }
  }, []);

  useEffect(() => {
    const initIndex = getSelectedIndex(currentValue, dataSource);
    if (wheelWrapperRef.current && !scrollInstance.current) {
      scrollInstance.current = new BScroll(wheelWrapperRef.current, {
        wheel: {
          selectedIndex: initIndex,
          wheelWrapperClass: `${prefixCls}-content`,
          wheelItemClass: `${prefixCls}-item`,
        },
        probeType: 3,
      });
    }

    scrollInstance.current?.on('scrollEnd', () => {
      handleScrollEnd();
    });

    return () => {
      scrollInstance.current?.destroy();
    };
  }, []);

  useEffect(() => {
    disabled && scrollInstance.current?.disable();
  }, [disabled]);

  useEffect(() => {
    if (!isEqual(prevDataSource, dataSource)) {
      scrollInstance.current?.refresh();
    }
  }, [dataSource]);

  useEffect(() => {
    const oldIndex = getSelectedIndex(prevValue, prevDataSource);
    const newIndex = getSelectedIndex(value, dataSource);
    if (newIndex !== oldIndex) {
      scrollInstance.current?.wheelTo(newIndex);
    }

    if (stopScroll && prevStopScroll !== stopScroll) {
      scrollInstance.current?.stop();
    }
  }, [value, defaultValue, dataSource, stopScroll, valueMember]);

  const rollerCls = classnames(prefixCls, className);
  const items = dataSource!.map((item, index) => {
    const itemCls = classnames(`${prefixCls}__item`, {
      [`${prefixCls}__item--selected`]: currentValue === item[valueMember!],
      [`${prefixCls}__item--disabled`]: disabled,
    });

    return (
      <div key={+index} className={itemCls}>
        {itemRender!(item)}
      </div>
    );
  });

  return (
    <div className={rollerCls} ref={wheelWrapperRef}>
      <div className={`${prefixCls}__content`}>{items}</div>
    </div>
  );
};

Wheel.displayName = 'Wheel';
Wheel.defaultProps = {
  dataSource: [],
  valueMember: 'value',
  itemRender: (item) => item!.label as string,
  stopScroll: false,
};

export default Wheel;
