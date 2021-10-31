import React, { useContext } from 'react';
import { ConfigContext } from '../n-config-provider';
import PickerView from '../picker-view';
import { DATE } from './constant';
import useDatePicker from './useDatePicker';
import type { DatePickerViewProps } from './interface';

const DatePickerView = (props: DatePickerViewProps) => {
  const { className, ...others } = props;

  const { prefixCls: globalPrefixCls } = useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-date-picker`;

  const { dataSource, value, onValueChange } = useDatePicker(props);

  return (
    <PickerView
      {...others}
      className={className}
      prefixCls={prefixCls}
      dataSource={dataSource}
      value={value}
      onChange={onValueChange}
    />
  );
};

DatePickerView.defaultProps = {
  mode: DATE,
  disabled: false,
  minuteStep: 1,
  valueMember: 'value',
  stopScroll: false,
};

export default DatePickerView;
