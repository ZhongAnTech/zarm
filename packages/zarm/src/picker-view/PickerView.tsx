import React, { Component } from 'react';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import Wheel from '../wheel';
import { isCascader } from '../utils/validate';
import parseProps from './utils/parseProps';
import removeFnFromProps from './utils/removeFnFromProps';
import type { BasePickerViewProps } from './PropsType';
import type { WheelValue, WheelItem } from '../wheel/interface';

export interface PickerViewProps extends BasePickerViewProps {
  prefixCls?: string;
  className?: string;
}

interface PickerViewState {
  value: Array<WheelValue>;
  dataSource: WheelItem[][];
}

export default class PickerView extends Component<PickerViewProps, PickerViewState> {
  static defaultProps = {
    prefixCls: 'za-picker-view',
    dataSource: [],
    cols: Infinity,
    valueMember: 'value',
    itemRender: (data) => data.label,
    disabled: false,
  };

  state: PickerViewState = parseProps.getSource(this.props);

  // TODO: is this method still be used?
  static getDerivedStateFromProps(props, state) {
    if (
      !isEqual(
        removeFnFromProps(props, ['onChange']),
        removeFnFromProps(state.prevProps, ['onChange']),
      )
    ) {
      return {
        prevProps: props,
        ...parseProps.getSource(props),
      };
    }

    return null;
  }

  onValueChange = (selected: WheelValue, level: number) => {
    const value = this.state.value.slice();
    const { dataSource, onChange, valueMember, cols } = this.props;

    if (isCascader({ dataSource })) {
      value.length = level + 1;
    }
    value[level] = selected;
    const newState = parseProps.getSource({ dataSource, value, valueMember, cols });
    this.setState(newState);
    if (typeof onChange === 'function') {
      onChange(newState.objValue, level);
    }
  };

  renderWheel = () => {
    const { valueMember, itemRender, disabled, stopScroll } = this.props;
    const { dataSource, value } = this.state;

    return dataSource.map((item, index) => (
      <Wheel
        key={+index}
        dataSource={item}
        value={value[index]}
        valueMember={valueMember}
        itemRender={itemRender}
        disabled={disabled}
        onChange={(selected: WheelValue) => this.onValueChange(selected, index)}
        stopScroll={stopScroll}
      />
    ));
  };

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(prefixCls, className);
    return (
      <div className={cls}>
        <div className={`${prefixCls}__content`}>{this.renderWheel()}</div>
        <div className={`${prefixCls}__mask ${prefixCls}__mask--top`} />
        <div className={`${prefixCls}__mask ${prefixCls}__mask--bottom`} />
      </div>
    );
  }
}
