import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BasePickerViewProps } from './PropsType';
import Wheel from '../wheel';
import { isCascader } from '../utils/validate';
import parseProps from './utils/parseProps';

export interface PickerViewProps extends BasePickerViewProps {
  prefixCls?: string;
  className?: string;
}

export default class PickerView extends PureComponent<PickerViewProps, any> {
  static defaultProps = {
    prefixCls: 'za-picker-view',
    dataSource: [],
    cols: Infinity,
    valueMember: 'value',
    itemRender: data => data.label,
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = parseProps.getSource(props);
  }

  componentWillReceiveProps(nextProps) {
    const state = parseProps.getSource(nextProps);
    this.setState(state);
  }

  onValueChange = (selected, level) => {
    const { value } = this.state;
    const { dataSource, onChange, valueMember, cols } = this.props;

    value[level] = selected;
    if (isCascader({ dataSource })) {
      value.length = level + 1;
    }

    const newState = parseProps.getSource({ dataSource, value, valueMember, cols });
    this.setState(newState);
    if (typeof onChange === 'function') {
      onChange(newState.objValue, level);
    }
  };

  onTransition = (isScrolling) => {
    const { onTransition } = this.props;
    if (typeof onTransition === 'function') {
      onTransition!(isScrolling);
    }
  };

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
  };

  render() {
    const { prefixCls, className } = this.props;
    const { dataSource } = this.state;
    const cls = classnames(prefixCls, className);
    return (
      <div className={cls}>
        <div className={classnames(`${prefixCls}__content`, className)}>
          {dataSource.map(this.renderWheel)}
        </div>
        <div className={`${prefixCls}__mask ${prefixCls}__mask--top`} />
        <div className={`${prefixCls}__mask ${prefixCls}__mask--bottom`} />
      </div>
    );
  }
}
