import React, { PureComponent } from 'react';
import classnames from 'classnames';
import formatFn from '../date-picker-view/utils/format';
import DatePicker from '../date-picker';
import type { BaseDateSelectProps } from './PropsType';

export interface DateSelectProps extends BaseDateSelectProps {
  prefixCls?: string;
  className?: string;
}

export default class DateSelect extends PureComponent<DateSelectProps, any> {
  static defaultProps: DateSelectProps = {
    prefixCls: 'za-date-select',
    mode: 'date',
    disabled: false,
    minuteStep: 1,
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
    const {
      prefixCls,
      className,
      placeholder,
      disabled,
      onChange,
      locale,
      value,
      ...others
    } = this.props;
    const { visible, selectValue } = this.state;

    const cls = classnames(prefixCls, {
      [`${prefixCls}--placeholder`]: !selectValue,
      [`${prefixCls}--disabled`]: disabled,
    });

    const arrowRender = <div className={`${prefixCls}__arrow`} />;

    return (
      <div className={cls} onClick={this.handleClick}>
        <input type="hidden" value={formatFn(this, selectValue)} />
        <div className={`${prefixCls}__input`}>
          <div className={`${prefixCls}__value`}>
            {formatFn(this, selectValue) || placeholder || locale!.placeholder}
          </div>
        </div>
        {arrowRender}
        <DatePicker
          {...others}
          className={className}
          visible={visible}
          value={selectValue}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
