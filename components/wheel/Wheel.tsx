import React, { Component } from 'react';
import classnames from 'classnames';
import BScroll from 'better-scroll';
import { BaseWheelProps } from './PropsType';
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
  static defaultProps = {
    prefixCls: 'za-wheel',
    dataSource: [],
    valueMember: 'value',
    itemRender: item => item.label,
  };

  private BScroll;

  private wrapper;

  // private initIndex;

  constructor(props) {
    super(props);
    this.state = {
      value: getValue(props),
    };
  }

  componentDidMount() {
    const { prefixCls, dataSource, disabled, onTransition, valueMember } = this.props;
    const { value } = this.state;
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

    this.BScroll.on('scroll', () => {
      if (typeof onTransition === 'function') {
        onTransition!(this.BScroll.isInTransition);
      }
    });

    this.BScroll.on('scrollEnd', () => {
      const index = this.BScroll.getSelectedIndex();
      const child = dataSource![index];
      if (child) {
        this.fireValueChange(child[valueMember!]);
        onTransition!(this.BScroll.isInTransition);
      } else if (console.warn) {
        onTransition!(this.BScroll.isInTransition);
        console.warn('child not found', dataSource, index);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.state;
    if ('value' in nextProps && nextProps.value !== value) {
      this.setState({
        value: nextProps.value,
      });

      const newIndex = this.getSelectedIndex(nextProps.value, nextProps.dataSource);
      this.BScroll.wheelTo(newIndex);
    }

    if (nextProps.disabled) {
      this.BScroll.disable();
    }
  }

  componentDidUpdate() {
    this.BScroll.refresh();
  }

  componentWillUnmount() {
    this.BScroll.destroy();
  }

  getSelectedIndex = (value, dataSource) => {
    const { valueMember } = this.props;
    let index;
    dataSource.some((item, i) => {
      if (item[valueMember!] === value) {
        index = i;
        return true;
      }
      return false;
    });
    return index;
  };

  fireValueChange = (value) => {
    if (value === this.state.value) {
      return;
    }

    // if (!('value' in this.props)) {
    this.setState({ value });
    // }

    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  render() {
    const { prefixCls, className, valueMember, dataSource, itemRender, disabled } = this.props;

    const { value } = this.state;
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
        ref={(wrapper) => { this.wrapper = wrapper; }}
      >
        {/* <div className={`${prefixCls}-indicator`} ref={(indicator) => { this.indicator = indicator; }} /> */}
        <div className={`${prefixCls}__content`}>{items}</div>
      </div>
    );
  }
}
