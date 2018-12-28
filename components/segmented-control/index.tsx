import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseSegmentedControlProps } from './PropsType';

export interface SegmentedControlProps extends BaseSegmentedControlProps {
}

interface SegmentedControlState {
  items: string[];
  selectIndex: number;
}

export default class SegmentedControl extends PureComponent<SegmentedControlProps, any> {
  static defaultProps = {
    block: false,
    items: ['选项1', '选项2'],
    shape: 'radius',
    disabled: false,
    prefixCls: 'za-segmented-control',
  };
  static MAX_ITEM_COUNT = 4;

  static getDerivedStateFromProps(props: SegmentedControlProps, state: SegmentedControlState) {
    if (props.selectIndex !== undefined && props.selectIndex !== null && props.selectIndex !== state.selectIndex) {
      return {
        selectIndex: props.selectIndex,
      };
    }
    return null;
  }

  constructor(props: SegmentedControlProps) {
    super(props);
    let { items, selectIndex } = props;
    // 格式化选项
    if (items.length > SegmentedControl.MAX_ITEM_COUNT) {
      items = items.slice(0, 4);
    }

    // 默认为items的第一个值.
    if (selectIndex === undefined) {
      selectIndex = 0;
    }
    // 检测selectIndex是否在items的可选范围
    if (selectIndex < 0 || selectIndex > props.items.length - 1) {
      selectIndex = 0;
    }
    this.state = {
      items,
      selectIndex,
    };
  }

  clickTab(newSelectIndex: number): void {
    // 用户设置了禁用
    if (this.props.disabled) {
      return;
    }
    const { selectIndex } = this.state;
    if (selectIndex === newSelectIndex) {
      return;
    }
    this.setState({
      selectIndex: newSelectIndex,
    }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(newSelectIndex);
      }
    });
  }

  render() {
    const {
      block,
      shape,
      style,
      prefixCls,
      className,
    } = this.props;
    const { state } = this;
    const { items } = state;
    const cls = classnames(prefixCls,
      className,
      block ? 'block' : null);
    const shapeCls = shape;
    const tabClassFn = (index: number) => {
      return classnames('tab', shapeCls, (state.selectIndex === index ? 'active' : null));
    };
    let tabRender = (item: string, index: number) => {
      return (
        <div
          key={item}
          className={tabClassFn(index)}
          onClick={() => { this.clickTab(index); }}
        >
          <span>{item}</span>
        </div>
      );
    };
    return (
      <div className={`${cls}`} style={style}>
        <div>{items.map(tabRender)}</div>
      </div>
    );
  }
}
