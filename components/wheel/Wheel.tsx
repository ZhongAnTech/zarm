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
    const { prefixCls } = this.props;
    this.BScroll = new BScroll(this.wrapper, {
      wheel: {
        selectedIndex: 0,
        wheelWrapperClass: `${prefixCls}-content`,
        wheelItemClass: `${prefixCls}-item`,
        adjustTime: 100,
      },
      probeType: 3,
    });

    if (this.props.disabled) {
      this.BScroll.disable();
    }

    const initIndex = this.getSelectedIndex(this.state.value, this.props.dataSource);
    setTimeout(() => {
      this.BScroll.wheelTo(initIndex);
    }, 80);

    this.BScroll.on('scroll', () => {
      this.props.onTransition!(true);
    });

    this.BScroll.on('scrollEnd', () => {
      const { dataSource, valueMember } = this.props;
      const index = this.BScroll.getSelectedIndex();
      const child = dataSource![index];

      if (child) {
        this.fireValueChange(child[valueMember!]);
        this.props.onTransition!(this.BScroll.isInTransition);
      } else if (console.warn) {
        this.props.onTransition!(this.BScroll.isInTransition);
        console.warn('child not found', dataSource, index);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }

    if (nextProps.disabled) {
      this.BScroll.disable();
    }

    const newIndex = this.getSelectedIndex(nextProps.value, nextProps.dataSource);
    setTimeout(() => {
      this.BScroll.wheelTo(newIndex);
    }, 0);
  }

  componentDidUpdate() {
    this.BScroll.refresh();
  }

  componentWillUnmount() {
    this.BScroll.destroy();
  }

  fireValueChange = (value) => {
    if (value === this.state.value) {
      return;
    }

    if (!('value' in this.props)) {
      this.setState({ value });
    }

    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  getSelectedIndex(value, dataSource) {
    const { valueMember } = this.props;
    let index;
    dataSource.some((item, i) => {
      if (item[valueMember!] === value) {
        index = i;
        return true;
      }
    });
    return index;
  }

  render() {
    const { prefixCls, className, valueMember, dataSource, itemRender } = this.props;

    const { value } = this.state;
    const items = dataSource!.map((item, index) => {
      const itemCls = classnames(`${prefixCls}-item`, {
        [`${prefixCls}-item-selected`]: value === item[valueMember!],
      });

      return (
        <div key={+index} className={itemCls}>
          {itemRender!(item)}
        </div>
      );
    });

    const rollerCls = classnames(`${prefixCls}`, className);

    return (
      <div
        className={rollerCls}
        ref={(wrapper) => { this.wrapper = wrapper; }}
      >
        {/* <div className={`${prefixCls}-indicator`} ref={(indicator) => { this.indicator = indicator; }} /> */}
        <div className={`${prefixCls}-content`}>{items}</div>
      </div>
    );
  }
}
