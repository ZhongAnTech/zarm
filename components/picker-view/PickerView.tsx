import React, { Component } from 'react';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import BasePickerViewProps from './PropsType';
import Wheel from '../wheel';
import { isCascader } from '../utils/validate';
import parseProps from './utils/parseProps';
import removeFnFromProps from './utils/removeFnFromProps';

export interface PickerViewProps extends BasePickerViewProps {
  prefixCls?: string;
  className?: string;
}

export type DataSource = Array<{ [key: string]: any; children?: DataSource }[]>;

export interface PickerViewState {
  value: string[] | number[];
  dataSource: DataSource;
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

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(removeFnFromProps(props, ['onChange', 'onTransition']), removeFnFromProps(state.prevProps, ['onChange', 'onTransition']))) {
      return {
        prevProps: props,
        ...parseProps.getSource(props),
      };
    }

    // if (!_.isEqual(state.value, state.prevValue)) {
    //   return {
    //     prevValue: state.value,
    //     ...parseProps.getSource({ ...props, value: state.value }),
    //   };
    // }
    return null;
  }

  onValueChange = (selected, level) => {
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

  onTransition = (isScrolling) => {
    const { onTransition } = this.props;
    if (typeof onTransition === 'function') {
      onTransition!(isScrolling);
    }
  };

  renderWheel = () => {
    const { valueMember, itemRender, disabled } = this.props;
    const { dataSource, value } = this.state;

    return dataSource.map((item, index) => (
      <Wheel
        key={+index}
        dataSource={item}
        value={value![index]}
        valueMember={valueMember}
        itemRender={itemRender}
        disabled={disabled}
        onChange={(selected) => this.onValueChange(selected, index)}
        onTransition={(isScrolling) => { this.onTransition(isScrolling); }}
      />
    ));
  };

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(prefixCls, className);
    return (
      <div className={cls}>
        <div className={classnames(`${prefixCls}__content`, className)}>
          {this.renderWheel()}
        </div>
        <div className={`${prefixCls}__mask ${prefixCls}__mask--top`} />
        <div className={`${prefixCls}__mask ${prefixCls}__mask--bottom`} />
      </div>
    );
  }
}
