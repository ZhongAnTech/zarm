import React from 'react';
import classnames from 'classnames';
import BScroll, { BScrollInstance } from 'better-scroll';
import { isArray } from '../utils/validate';
import type { BaseWheelProps, WheelItem, WheelValue } from './interface';

const getValue = (props: Omit<WheelProps, 'itemRender'>, defaultValue?: any) => {
  if ('value' in props) {
    return props.value;
  }
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  if (isArray(props.dataSource) && props.dataSource[0] && props.valueMember) {
    return props.dataSource[0][props.valueMember];
  }
  return defaultValue;
};

export interface WheelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'value' | 'onChange'>, BaseWheelProps {
  prefixCls?: string;
}

const Wheel = React.forwardRef<unknown, WheelProps>((props, ref) => {
  const {
    prefixCls,
    className,
    value,
    defaultValue,
    valueMember,
    dataSource,
    disabled,
    stopScroll,
    itemRender,
    onChange
  } = props;

  const scrollInstance = React.useRef<BScrollInstance | null>(null);
  const wheelWrapperRef = (ref as any) || React.createRef<HTMLElement>();
  const [currentValue, setCurrentValue] = React.useState(getValue({ value, defaultValue, dataSource, valueMember }))

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

  const handleScrollEnd = () => {
    const index = scrollInstance.current?.getSelectedIndex();
    const child = dataSource[index];
    if (child) {
      fireValueChange(child[valueMember!]);
    }
  };

  React.useEffect(() => {
    const initIndex = getSelectedIndex(currentValue, dataSource);
    if (!scrollInstance.current) {
      scrollInstance.current = new BScroll(wheelWrapperRef.current, {
        wheel: {
          selectedIndex: initIndex,
          wheelWrapperClass: `${prefixCls}-content`,
          wheelItemClass: `${prefixCls}-item`,
        },
        probeType: 3,
      });
    }

    disabled && scrollInstance.current?.disable();
    scrollInstance.current?.on('scrollEnd', () => {
      handleScrollEnd();
    });

    return () => {
      scrollInstance.current?.destroy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    disabled && scrollInstance.current?.disable();
    scrollInstance.current?.refresh();

    const newIndex = getSelectedIndex(value, dataSource);
    scrollInstance.current?.wheelTo(newIndex);

    if (stopScroll) {
      scrollInstance.current?.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, defaultValue, dataSource, disabled, stopScroll, valueMember])

  React.useEffect(() => {
    setCurrentValue(getValue({ value, defaultValue, dataSource, valueMember }))
  }, [value, defaultValue, dataSource, valueMember])

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
    <div
      className={rollerCls}
      ref={wheelWrapperRef}
    >
      <div className={`${prefixCls}__content`}>{items}</div>
    </div>
  );
});


Wheel.displayName = 'Wheel';
Wheel.defaultProps = {
  prefixCls: 'za-wheel',
  dataSource: [],
  valueMember: 'value',
  itemRender: (item) => item!.label as string,
  stopScroll: false,
};

export default Wheel;
