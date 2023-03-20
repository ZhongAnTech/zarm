import { createBEM } from '@zarm-design/bem';
import clamp from 'lodash/clamp';
import isEqual from 'lodash/isEqual';
import * as React from 'react';
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';
import { ConfigContext } from '../config-provider';
import DatePicker from '../date-picker';
import { COLUMN_TYPE } from '../date-picker-view/interface';
import {
  dateToNumberArray,
  generateDatePickerColumns,
  useRenderLabel,
} from '../date-picker-view/utils';
import type { PickerColumnItem } from '../picker-view';
import { resolved } from '../picker-view/utils';
import type { SelectCssVars } from '../select';
import { useSafeState } from '../utils/hooks';
import { HTMLProps } from '../utils/utilityTypes';
import type { BaseDateSelectProps } from './interface';

const currentYear = new Date().getFullYear();

export type DateSelectProps = BaseDateSelectProps & HTMLProps<SelectCssVars>;

const DateSelect: React.FC<DateSelectProps> = (props) => {
  const {
    className,
    style,
    placeholder,
    disabled = false,
    hasArrow = true,
    value,
    defaultValue,
    min = new Date(new Date().setFullYear(currentYear - 10)),
    max = new Date(new Date().setFullYear(currentYear + 10)),
    columnType = [COLUMN_TYPE.YEAR, COLUMN_TYPE.MONTH, COLUMN_TYPE.DAY],
    filter,
    renderLabel,
    displayRender = (items) => items?.map((item) => item && item.label),
    onChange,
    onCancel,
    onConfirm,
    ...rest
  } = props;

  const [innerValue, setInnerValue] = useSafeState(value || defaultValue);
  const [visible, setVisible] = useSafeState(false);
  const { locale: globalLocal, prefixCls } = React.useContext(ConfigContext);
  const defaultRenderLabel = useRenderLabel(renderLabel);
  const locale = globalLocal.DateSelect;
  const bem = createBEM('date-select', { prefixCls });

  React.useEffect(() => {
    if (props.value === undefined) return;
    if (isEqual(value, innerValue)) return;
    setInnerValue(value);
  }, [value]);

  const handleClick = () => {
    if (disabled) return;
    setVisible(true);
  };

  const handleConfirm = (changedValue: Date, changedItems: PickerColumnItem[]) => {
    batchedUpdates(() => {
      setInnerValue(changedValue);
      setVisible(false);
    });

    onConfirm?.(changedValue, changedItems);
  };

  const handleCancel = () => {
    setVisible(false);
    onCancel?.();
  };

  const now = React.useMemo(() => new Date(), []);

  const currentValue = React.useMemo(() => {
    const date = innerValue || now;
    return new Date(clamp(date.getTime(), min.getTime(), max.getTime()));
  }, [innerValue, min, max, columnType]);

  const pickerValue = React.useMemo(
    () => dateToNumberArray(currentValue, columnType),
    [currentValue, columnType],
  );

  const { items } = resolved({
    dataSource: generateDatePickerColumns(
      currentValue,
      min,
      max,
      columnType,
      defaultRenderLabel,
      filter,
    ),
    value: pickerValue,
  });

  const arrowRender = <div className={bem('arrow')} />;

  return (
    <>
      <div
        className={bem([
          {
            placeholder: !innerValue,
            disabled,
            visible,
          },
          className,
        ])}
        style={style}
        onClick={handleClick}
      >
        <div className={bem('input')}>
          <div className={bem('value')}>
            {(innerValue && displayRender?.(items)) || placeholder || locale.placeholder}
          </div>
        </div>
        {hasArrow ? arrowRender : null}
      </div>
      <DatePicker
        {...rest}
        visible={visible}
        columnType={columnType}
        value={innerValue}
        min={min}
        max={max}
        filter={filter}
        renderLabel={renderLabel}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

export default DateSelect;
