import React, { PureComponent } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import BaseDateSelectProps from './PropsType';
import formatFn from '../date-picker-view/utils/format';
import DatePicker from '../date-picker';
import removeFnFromProps from '../picker-view/utils/removeFnFromProps';
import { parseState } from '../date-picker-view/utils/parseState';

export interface DateSelectProps extends BaseDateSelectProps {
  prefixCls?: string;
  className?: any;
}

export default class DateSelect extends PureComponent<DateSelectProps, any> {
  static defaultProps = {
    mode: 'date',
    disabled: false,
    minuteStep: 1,
    prefixCls: 'za-date-select',
    valueMember: 'value',
    onCancel: () => {},
  };

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(removeFnFromProps(props, ['onOk', 'onCancel', 'onChange']), removeFnFromProps(state.prevProps, ['onOk', 'onCancel', 'onChange']))) {
      return {
        prevProps: props,
        ...parseState(props),
      };
    }

    return null;
  }

  state = {
    visible: false,
  };

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
    this.setState({ visible: false });
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
    const { prefixCls, className, placeholder, disabled, onChange, locale, value, ...others } = this.props;
    const { visible } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--placeholder`]: !value,
      [`${prefixCls}--disabled`]: disabled,
    });

    return (
      <div className={cls} onClick={this.handleClick}>
        <input type="hidden" value={formatFn(this, value)} />
        <div className={`${prefixCls}__input`}>
          {value ? formatFn(this, value) : placeholder || locale!.placeholder}
        </div>
        <DatePicker
          {...others}
          visible={visible}
          value={value}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
