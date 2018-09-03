import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BasePickerViewProps } from './PropsType';
import Wheel from '../wheel';
import getState, { isCascader } from '../utils/getState';

export interface PickerViewProps extends BasePickerViewProps {
  prefixCls?: string;
  className?: string;
}

export default class PickerView extends PureComponent<PickerViewProps, any> {
  static defaultProps = {
    prefixCls: 'za-picker',
    dataSource: [],
    cols: Infinity,
    valueMember: 'value',
    itemRender: data => data.label,
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = getState(props);
  }

  componentWillReceiveProps(nextProps) {
    const state = getState(nextProps);
    this.setState(state);
  }

  onValueChange = (selected, level) => {
    const { value } = this.state;
    const { dataSource, onChange, valueMember, cols } = this.props;

    value[level] = selected;
    if (isCascader({ dataSource })) {
      value.length = level + 1;
    }

    const newState = getState({ dataSource, value, valueMember, cols });
    this.setState(newState);
    if (typeof onChange === 'function') {
      onChange(newState.objValue, level);
    }
  }

  onTransition(isScrolling) {
    if (typeof this.props.onTransition === 'function') {
      this.props.onTransition!(isScrolling);
    }
  }

  renderWheel = (item, index) => {
    const { valueMember, itemRender, disabled } = this.props;
    const { value } = this.state;

    return (
      <Wheel
        key={+index}
        dataSource={item}
        value={value[index]}
        valueMember={valueMember}
        itemRender={itemRender}
        disabled={disabled}
        onChange={selected => this.onValueChange(selected, index)}
        onTransition={(isScrolling) => { this.onTransition(isScrolling); }}
      />
    );
  }

  render() {
    const { prefixCls, className } = this.props;
    const { dataSource } = this.state;

    return (
      <div className={`${prefixCls}-panel`}>
        <div className={classnames(`${prefixCls}-view`, className)}>
          {dataSource.map(this.renderWheel)}
        </div>
        <div className={`${prefixCls}-mask-top`} />
        <div className={`${prefixCls}-mask-bottom`} />
      </div>
    );
  }
}
