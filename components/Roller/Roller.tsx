import React, { Component } from 'react';
import classnames from 'classnames';
import ZScroller from 'zscroller';
import { BaseRollerProps } from './PropsType';

function getChildMember(child, m) {
  return child[m];
}

function toChildrenArray(children) {
  return children;
}

export interface RollerProps extends BaseRollerProps {
  prefixCls?: string;
  className?: any;
}

export default class Roller extends Component<RollerProps, any> {

  static Group: any;
  static Cascader: any;
  static defaultProps = {
    prefixCls: 'za-roller',
    onValueChange: () => {},
    itemRender: data => data.label,
  };

  private zscroller;
  private indicator;
  private itemHeight;
  private content;

  constructor(props) {
    super(props);
    let selectedValueState;
    const { selectedValue, defaultSelectedValue, children } = this.props;

    if (selectedValue !== undefined) {
      selectedValueState = selectedValue;
    } else if (defaultSelectedValue !== undefined) {
      selectedValueState = defaultSelectedValue;
    } else if (children && children.length) {
      selectedValueState = children[0][this.props.valueMember];
    }
    this.state = {
      selectedValue: selectedValueState,
    };
  }

  componentDidMount() {
    this.itemHeight = this.indicator.offsetHeight;
    // console.log('this.itemHeight -> ', this.indicator.offsetHeight);
    // compact
    this.content.style.padding = `${this.itemHeight * 3}px 0`;
    this.zscroller = new ZScroller(this.content, {
      scrollingX: false,
      snapping: true,
      penetrationDeceleration: 0.1,
      minVelocityToKeepDecelerating: 0.5,
      scrollingComplete: this.scrollingComplete.bind(this),
    });

    this.zscroller.setDisabled(this.props.disabled);
    this.zscroller.scroller.setSnapSize(0, this.itemHeight);

    this.select(this.state.selectedValue);
  }

  componentWillReceiveProps(nextProps) {
    if ('selectedValue' in nextProps) {
      this.setState({
        selectedValue: nextProps.selectedValue,
      });
    }
    this.zscroller.setDisabled(nextProps.disabled);
  }

  shouldComponentUpdate() {
    return true;
    // return this.state.selectedValue !== nextState.selectedValue
    //   || !isChildrenEqual(this.props.children, nextProps.children, this.props.pure);
  }

  componentDidUpdate() {
    this.zscroller.reflow();
    this.select(this.state.selectedValue);
  }

  componentWillUnmount() {
    this.zscroller.destroy();
  }

  getValue = () => {
    return this.props.selectedValue ? this.props.selectedValue
      : this.props.children && this.props.children[0] && this.props.children[0][this.props.valueMember];
  }

  scrollingComplete = () => {
    const { top } = this.zscroller.scroller.getValues();
    if (top >= 0) {
      this.doScrollingComplete(top);
    }
  }

  fireValueChange = (selectedValue) => {
    const { onValueChange } = this.props;
    if (selectedValue !== this.state.selectedValue) {
      if (!('selectedValue' in this.props)) {
        this.setState({
          selectedValue,
        });
      }
      if (typeof onValueChange === 'function') {
        onValueChange(selectedValue);
      }
    }
  }

  scrollTo = (top) => {
    this.zscroller.scroller.scrollTo(0, top);
  }

  select = (value) => {
    const children = toChildrenArray(this.props.children);
    for (let i = 0, len = children.length; i < len; i += 1) {
      if (getChildMember(children[i], this.props.valueMember) === value) {
        this.selectByIndex(i);
        return;
      }
    }
    this.selectByIndex(0);
  }

  selectByIndex = (index) => {
    if (index < 0 || index >= toChildrenArray(this.props.children).length || !this.itemHeight) {
      return;
    }
    this.scrollTo(index * this.itemHeight);
  }

  doScrollingComplete = (top) => {
    let index = top / this.itemHeight;
    const floor = Math.floor(index);
    if (index - floor > 0.5) {
      index = floor + 1;
    } else {
      index = floor;
    }

    const children = toChildrenArray(this.props.children);

    index = Math.min(index, children.length - 1);
    const child = children[index];
    if (child) {
      this.fireValueChange(getChildMember(child, this.props.valueMember));
    } else if (console.warn) {
      console.warn('child not found', children, index);
    }
  }

  render() {
    const {
      children, prefixCls,
      className, itemStyle, itemRender,
      valueMember,
    } = this.props;

    const { selectedValue } = this.state;
    const itemClassName = `${prefixCls}-item`;
    const selectedItemClassName = `${itemClassName} ${prefixCls}-item-selected`;
    const items = children.map((item, index) => {
      return (
        <div
          style={itemStyle}
          className={selectedValue === item[valueMember] ? selectedItemClassName : itemClassName}
          key={index}
        >
          {itemRender(item)}
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
