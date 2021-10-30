import React, { useContext, useState, useEffect } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import formatFn from '../date-picker-view/utils/format';
import DatePicker from '../date-picker';
import type { BaseDateSelectProps } from './interface';

export type DateSelectProps = BaseDateSelectProps & React.HTMLAttributes<HTMLElement>;

const DateSelect = (props) => {
  const {
    className,
    placeholder,
    disabled,
    onChange,
    onCancel,
    value,
    onOk,
    format,
    mode,
    ...others
  } = props;

  const [visible, setVisible] = useState(false);
  const [selectValue, setSelectValue] = useState(value);

  const { prefixCls: globalPrefixCls, locale: globalLocal } = useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-date-select`;
  // const cls = classnames(prefixCls, className);
  const locale = globalLocal?.DateSelect;

  const cls = classnames(prefixCls, {
    [`${prefixCls}--placeholder`]: !selectValue,
    [`${prefixCls}--disabled`]: disabled,
  });

  const handleClick = () => {
    if (disabled) {
      return false;
    }
    setVisible(true);
  };

  const onDatePickerOk = (selected) => {
    setVisible(false);
    setSelectValue(selected);

    typeof onOk === 'function' && onOk(selected);
  };

  const onDatePickerCancel = () => {
    setVisible(false);

    typeof onCancel === 'function' && onCancel();
  };

  useEffect(() => setSelectValue(value), [value]);

  return (
    <div className={cls} onClick={handleClick}>
      <input type="hidden" value={formatFn({ mode, format }, selectValue)} />
      <div className={`${prefixCls}__input`}>
        <div className={`${prefixCls}__value`}>
          {formatFn({ mode, format }, selectValue) || placeholder || locale!.placeholder}
        </div>
      </div>
      <div className={`${prefixCls}__arrow`} />
      <DatePicker
        {...others}
        className={className}
        visible={visible}
        value={selectValue}
        onOk={onDatePickerOk}
        onCancel={onDatePickerCancel}
      />
    </div>
  );
};

DateSelect.defaultProps = {
  mode: 'date',
  disabled: false,
  minuteStep: 1,
  valueMember: 'value',
  hasArrow: true,
  onCancel: () => {},
};

export default DateSelect;
