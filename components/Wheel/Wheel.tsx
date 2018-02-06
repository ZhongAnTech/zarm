import React, { Component } from 'react';
import classnames from 'classnames';
import ZScroller from 'zscroller';
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

  private zscroller;
  private indicator;
  private itemHeight;
  private content;

  constructor(props) {
    super(props);
    this.state = {
      value: getValue(props),
    };
  }

  componentDidMount() {
    this.itemHeight = this.indicator.offsetHeight;
    this.zscroller = new ZScroller(this.content, {
      scrollingX: false,
      snapping: true,
      penetrationDeceleration: 0.1,
      minVelocityToKeepDecelerating: 0.5,
      scrollingComplete: this.scrollingComplete.bind(this),
    });

    this.zscroller.setDisabled(this.props.disabled);
    this.zscroller.scroller.setSnapSize(0, this.itemHeight);

    this.select(this.state.value);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
    this.zscroller.setDisabled(nextProps.disabled);
  }

  componentDidUpdate() {
    this.zscroller.reflow();
    this.select(this.state.value);
  }

  componentWillUnmount() {
    this.zscroller.destroy();
  }

  getValue = () => {
    const { value, valueMember, dataSource } = this.props;
    return value || dataSource && dataSource[0] && dataSource[0][valueMember!];
  }

  scrollingComplete = () => {
    const { top } = this.zscroller.scroller.getValues();
    if (top >= 0) {
      this.doScrollingComplete(top);
    }
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

  scrollTo = (top) => {
    this.zscroller.scroller.scrollTo(0, top);
  }

  select = (value) => {
    const { dataSource, valueMember } = this.props;
    for (let i = 0, len = dataSource!.length; i < len; i += 1) {
      if (dataSource![i][valueMember!] === value) {
        this.selectByIndex(i);
        return;
      }
    }
    this.selectByIndex(0);
  }

  selectByIndex = (index) => {
    if (index < 0 || index >= this.props.dataSource!.length || !this.itemHeight) {
      return;
    }
    this.scrollTo(index * this.itemHeight);
  }

  doScrollingComplete = (top) => {
    let index = top / this.itemHeight;
    const floor = Math.floor(index);
    index = (index - floor > 0.5)
      ? floor + 1
      : floor;

    const { dataSource, valueMember } = this.props;
    index = Math.min(index, dataSource!.length - 1);

    const child = dataSource![index];

    if (child) {
      this.fireValueChange(child[valueMember!]);
    } else if (console.warn) {
      console.warn('child not found', dataSource, index);
    }
  }

  render() {
    const {
      prefixCls,
      className,
      valueMember,
      dataSource,
      itemRender,
    } = this.props;

    const { value } = this.state;
    const items = dataSource!.map((item, index) => {
      const itemCls = classnames(`${prefixCls}-item`, {
        [`${prefixCls}-item-selected`]: value === item[valueMember!],
      });

      return (
        <div
          key={+index}
          className={itemCls}
        >
          {itemRender!(item)}
        </div>
      );
    });

    const rollerCls = classnames(`${prefixCls}`, className);

    return (
      <div className={rollerCls}>
        <div className={`${prefixCls}-indicator`} ref={(indicator) => { this.indicator = indicator; }} />
        <div className={`${prefixCls}-content`} ref={(content) => { this.content = content; }}>
          {items}
        </div>
      </div>
    );
  }
}
