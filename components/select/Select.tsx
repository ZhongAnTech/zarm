import React, { PureComponent } from 'react';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import BaseSelectProps from './PropsType';
import Picker from '../picker';
import parseProps from '../picker-view/utils/parseProps';
import removeFnFromProps from '../picker-view/utils/removeFnFromProps';
import { isArray, isString } from '../utils/validate';

const isValueValid = (value) => {
  return (isString(value) && !!value.trim()) || (isArray(value) && value.length > 0 && value.some((item) => !!item));
};
export interface SelectProps extends BaseSelectProps {
  prefixCls?: string;
  className?: string;
}

export type DataSource = Array<{ [key: string]: any; children?: DataSource }>;

export interface SelectState {
  selectValue: string[] | number[];
  visible: boolean;
}

export default class Select extends PureComponent<SelectProps, SelectState> {
  static defaultProps = {
    prefixCls: 'za-select',
    dataSource: [],
    valueMember: 'value',
    itemRender: (data) => data && data.label,
    cols: Infinity,
    hasArrow: true,
    maskClosable: true,
    displayRender: (selected) => selected.map((item) => item && item.label),
    onClick: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectValue: isValueValid(props.value) && parseProps.getSource(props).objValue,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(removeFnFromProps(props, ['onOk', 'onCancel', 'onChange']), removeFnFromProps(state.prevProps, ['onOk', 'onCancel', 'onChange']))) {
      return {
        prevProps: props,
        selectValue: isValueValid(props.value) && parseProps.getSource(props).objValue,
      };
    }

    return null;
  }

  handleClick = () => {
    const { disabled } = this.props;
    if (disabled) {
      return false;
    }
    this.setState({
      visible: true,
    });
  };

  onChange = (selected) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(selected);
    }
  };

  onOk = (selected) => {
    const { onOk } = this.props;
    this.setState({
      selectValue: selected,
      visible: false,
    }, () => {
      if (typeof onOk === 'function') {
        onOk(selected);
      }
    });
  };

  // 点击取消
  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      visible: false,
    });

    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  render() {
    const { prefixCls, placeholder, className, disabled, displayRender, locale, value, hasArrow, ...others } = this.props;
    const { visible, selectValue = [] } = this.state;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--placeholder`]: !selectValue.length,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--arrow`]: hasArrow,
    });
    return (
      <div className={cls} onClick={this.handleClick}>
        <div className={`${prefixCls}__input`}>
          <div className={`${prefixCls}__value`}>{(selectValue.length && displayRender!(selectValue || [])) || placeholder || locale!.placeholder}</div>
        </div>
        <Picker
          {...others}
          visible={visible}
          value={value}
          onOk={this.onOk}
          onChange={this.onChange}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
