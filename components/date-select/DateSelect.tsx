import React, { PureComponent } from 'react';
import classnames from 'classnames';
import BaseDateSelectProps from './PropsType';
import formatFn from '../date-picker-view/utils/format';
import DatePicker from '../date-picker';

export interface DateSelectProps extends BaseDateSelectProps {
  prefixCls?: string;
  className?: string;
}

export default class DateSelect extends PureComponent<DateSelectProps, any> {
  static defaultProps = {
    mode: 'date',
    disabled: false,
    minuteStep: 1,
    prefixCls: 'za-date-select',
    valueMember: 'value',
    hasArrow: true,
    onCancel: () => {},
  };

  static getDerivedStateFromProps(props) {
    return {
      selectValue: props.value,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectValue: props.value,
    };
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
      visible: false,
      selectValue: selected,
    });

    if (typeof onOk === 'function') {
      onOk(selected);
    }
  };

  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({ visible: false });
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  render() {
    const { prefixCls, className, placeholder, disabled, onChange, locale, value, hasArrow, ...others } = this.props;
    const { visible, selectValue } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--placeholder`]: !selectValue,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--arrow`]: hasArrow,
    });

    return (
      <div className={cls} onClick={this.handleClick}>
        <input type="hidden" value={formatFn(this, selectValue)} />
        <div className={`${prefixCls}__input`}>
          <div className={`${prefixCls}__value`}>{formatFn(this, selectValue) || placeholder || locale!.placeholder}</div>
        </div>
        <DatePicker
          {...others}
          visible={visible}
          value={selectValue}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
