import React, { useCallback, useContext, useEffect, useState } from 'react';
import { createBEM } from '@zarm-design/bem';
import formatFn from '../date-picker-view/utils/format';
import DatePicker from '../date-picker';
import { ConfigContext } from '../n-config-provider';
import type { BaseDateSelectProps } from './interface';
import { HTMLProps } from '../utils/utilityTypes';

export type DateSelectProps = BaseDateSelectProps & HTMLProps;

const DateSelect = (props: DateSelectProps) => {
  const {
    className,
    placeholder,
    disabled,
    hasArrow,
    onChange,
    onCancel,
    onConfirm,
    value,
    ...others
  } = props;

  const { locale: globalLocal, prefixCls } = useContext(ConfigContext);

  const [state, setState] = useState({
    visible: false,
    selectValue: value,
  });

  const { visible, selectValue } = state;

  const bem = createBEM('date-select', { prefixCls });
  const cls = bem([
    {
      placeholder: !selectValue,
      disabled,
    },
    className,
  ]);

  const handleClick = () => {
    if (disabled) {
      return false;
    }
    setState({
      ...state,
      visible: true,
    });
  };

  useEffect(() => {
    setState({
      ...state,
      selectValue: value,
    });
  }, [value]);

  const handleOk = useCallback(
    (selected) => {
      setState({ visible: false, selectValue: selected });
      onConfirm?.(selected);
    },
    [onConfirm],
  );

  const handleCancel = useCallback(() => {
    setState({ ...state, visible: false });
    onCancel?.();
  }, [onCancel]);

  const handleOnInit = useCallback((selected) => {
    setState({
      ...state,
      selectValue: selected,
    });
  }, []);

  const arrowRender = <div className={bem('arrow')} />;
  return (
    <div className={cls} onClick={handleClick}>
      <input type="hidden" value={formatFn(props, selectValue)} />
      <div className={bem('input')}>
        <div className={bem('value')}>
          {formatFn(props, selectValue) || placeholder || globalLocal?.DateSelect!.placeholder}
        </div>
      </div>
      {hasArrow ? arrowRender : null}
      <DatePicker
        {...others}
        className={className}
        visible={visible}
        value={selectValue}
        onConfirm={handleOk}
        onInit={handleOnInit}
        onCancel={handleCancel}
      />
    </div>
  );
};

DateSelect.defaultProps = {
  mode: 'date',
  disabled: false,
  minuteStep: 1,
  hasArrow: true,
  onCancel: () => {},
};

export default DateSelect;
