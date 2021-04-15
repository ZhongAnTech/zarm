import React, { Component } from 'react';
import classnames from 'classnames';
import BScroll from 'better-scroll';
import BaseWheelProps, { WheelItem, WheelValue } from './PropsType';
import { isArray } from '../utils/validate';

const getValue = (props, defaultValue?: any) => {
  if ('value' in props) {
    return props.value;
  }
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  if (isArray(props.dataSource) && props.dataSource[0]) {
    return props.dataSource[0][props.valueMember];
  }
  return defaultValue;
};

export interface WheelProps extends BaseWheelProps {
  prefixCls?: string;
  className?: string;
}

export default class Wheel extends Component<WheelProps, any> {
  private BScroll;

  private wrapper;

  static defaultProps: WheelProps = {
    prefixCls: 'za-wheel',
    dataSource: [],
    valueMember: 'value',
    itemRender: (item) => item!.label as string,
    stopScroll: false,
  };

  componentDidMount() {
    const { prefixCls, dataSource, disabled } = this.props;
    const value = getValue(this.props);
    const initIndex = this.getSelectedIndex(value, dataSource);
    this.BScroll = new BScroll(this.wrapper, {
      wheel: {
        selectedIndex: initIndex,
        wheelWrapperClass: `${prefixCls}-content`,
        wheelItemClass: `${prefixCls}-item`,
      },
      probeType: 3,
    });

    disabled && this.BScroll.disable();

    this.BScroll.on('scrollEnd', () => {
      console.log('[54] Wheel.tsx: ', 'scrollEnd');
      this.handleScrollEnd();
    });
  }

  componentDidUpdate(prevProps) {
    const { value, dataSource, disabled, stopScroll } = this.props;
    disabled && this.BScroll.disable();
    this.BScroll.refresh();
    const oldIndex = this.getSelectedIndex(prevProps.value, prevProps.dataSource);
    const newIndex = this.getSelectedIndex(value, dataSource);
    if (newIndex !== oldIndex) {
      this.BScroll.wheelTo(newIndex);
    }

    if (stopScroll && prevProps.stopScroll !== stopScroll) {
      // console.log('componentDidUpdate stopScroll');
      this.BScroll.stop();
      // this.handleScrollEnd();
    }
  }

  componentWillUnmount() {
    this.BScroll.destroy();
  }

  handleScrollEnd = () => {
    const { dataSource: curDataSource, valueMember } = this.props;
    const index = this.BScroll.getSelectedIndex();
    const child = curDataSource[index];

    if (child) {
      this.fireValueChange(child[valueMember!]);
    }
  };

  getSelectedIndex = (value?: WheelValue, dataSource?: Array<WheelItem>): number => {
    const { valueMember } = this.props;
    let index = 0;
    if (dataSource) {
      dataSource.some((item, i) => {
        if (item[valueMember!] === value) {
          index = i;
          return true;
        }
        return false;
      });
    }
    return index;
  };

  fireValueChange = (value) => {
    const currentValue = getValue(this.props);
    if (value === currentValue) {
      return;
    }

    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  render() {
    const { prefixCls, className, valueMember, dataSource, itemRender, disabled } = this.props;
    const value = getValue(this.props);

    const items = dataSource!.map((item, index) => {
      const itemCls = classnames(`${prefixCls}__item`, {
        [`${prefixCls}__item--selected`]: value === item[valueMember!],
        [`${prefixCls}__item--disabled`]: disabled,
      });

      return (
        <div key={+index} className={itemCls}>
          {itemRender!(item)}
        </div>
      );
    });

    const rollerCls = classnames(prefixCls, className);

    return (
      <div
        className={rollerCls}
        ref={(wrapper) => {
          this.wrapper = wrapper;
        }}
      >
        <div className={`${prefixCls}__content`}>{items}</div>
      </div>
    );
  }
}
