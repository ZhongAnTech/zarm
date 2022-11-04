import React, { useContext, useEffect, useState } from 'react';
import { createBEM } from '@zarm-design/bem';
import isEqual from 'lodash/isEqual';
import formatFn from '../date-picker-view/utils/format';
import DatePicker from '../date-picker';
import { ConfigContext } from '../n-config-provider';
import type { BaseDateSelectProps } from './interface';
import { HTMLProps } from '../utils/utilityTypes';

export type DateSelectProps = BaseDateSelectProps & HTMLProps;

const DateSelect = React.forwardRef<HTMLDivElement, DateSelectProps>((props, ref) => {
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

  const [state, setState] = useState<{
    visible: boolean;
    selectValue?: Date | string;
  }>({
    visible: false,
    selectValue: value,
  });

  const { visible, selectValue } = state;

  const bem = createBEM('date-select', { prefixCls });
  const cls = bem([
    {
      placeholder: !selectValue,
      disabled,
      visible: state.visible,
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
    if (props.value === undefined) return;
    if (isEqual(props.value, state.selectValue)) return;
    setState({
      ...state,
      selectValue: value,
    });
  }, [value]);

  const handleOk = (selected) => {
    setState({ visible: false, selectValue: selected });
    onConfirm?.(props.format ? formatFn(props, selected) : selected);
  };

  const handleCancel = () => {
    setState({ ...state, visible: false });
    onCancel?.();
  };

  const arrowRender = <div className={bem('arrow')} />;
  return (
    <>
      <div className={cls} onClick={handleClick} ref={ref}>
        <input type="hidden" value={formatFn(props, selectValue)} />
        <div className={bem('input')}>
          <div className={bem('value')}>
            {formatFn(props, selectValue) || placeholder || globalLocal?.DateSelect!.placeholder}
          </div>
        </div>
        {hasArrow ? arrowRender : null}
      </div>
      <DatePicker
        {...others}
        className={className}
        visible={visible}
        value={selectValue}
        onConfirm={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
});

DateSelect.defaultProps = {
  mode: 'date',
  disabled: false,
  minuteStep: 1,
  hasArrow: true,
};

export default DateSelect;
