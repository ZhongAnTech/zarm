import { createBEM } from '@zarm-design/bem';
import isEqual from 'lodash/isEqual';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { useSafeState } from '../utils/hooks';
import type { HTMLProps } from '../utils/utilityTypes';
import Wheel from '../wheel';
import type { WheelValue } from '../wheel/interface';
import type { BasePickerViewProps, PickerColumnItem } from './interface';
import { isCascader, resolved } from './utils';

export interface PickerViewCssVars {
  '--background-color': React.CSSProperties['backgroundColor'];
  '--padding': React.CSSProperties['padding'];
  '--mask-start-background-color': React.CSSProperties['backgroundColor'];
  '--mask-end-background-color': React.CSSProperties['backgroundColor'];
  '--wheel-item-rows': number;
  '--wheel-item-height': React.CSSProperties['height'];
  '--wheel-item-font-size': React.CSSProperties['fontSize'];
  '--wheel-item-text-color': React.CSSProperties['color'];
  '--wheel-item-disabled-text-color': React.CSSProperties['color'];
  '--wheel-item-selected-background-color': React.CSSProperties['backgroundColor'];
  '--wheel-item-selected-border-radius': React.CSSProperties['borderRadius'];
}

export type PickerViewProps = BasePickerViewProps & HTMLProps<PickerViewCssVars>;

export interface PickerViewInstance {
  value: WheelValue[];
  items: PickerColumnItem[];
  reset: () => void;
}

const PickerView = React.forwardRef<PickerViewInstance, PickerViewProps>((props, ref) => {
  const { className, style, cols, dataSource, fieldNames, itemRender, disabled, onChange } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('picker-view', { prefixCls });
  const [innerValue, setInnerValue] = React.useState(resolved(props).value);
  const [stopScroll, setStopScroll] = useSafeState(false);

  React.useEffect(() => {
    if (props.value === undefined) return;
    if (isEqual(props.value, innerValue)) return;
    setInnerValue(resolved(props).value);
  }, [props.value]);

  const { columns, items } = React.useMemo(
    () => resolved({ ...props, value: innerValue }),
    [cols, innerValue, dataSource, fieldNames],
  );

  const reset = () => {
    setStopScroll(true);
    setTimeout(() => {
      setInnerValue(resolved(props).value);
      setStopScroll(false);
    }, 0);
  };

  React.useImperativeHandle(ref, () => ({
    value: innerValue,
    items,
    reset,
  }));

  const onValueChange = React.useCallback(
    (selected: WheelValue, index: number) => {
      const value = innerValue.slice();
      if (isCascader(props.dataSource)) {
        value.length = index + 1;
      }
      value[index] = selected;
      const next = resolved({ ...props, value });
      setInnerValue(next.value);
      onChange?.(next.value, next.items, index);
    },
    [innerValue],
  );

  return (
    <div className={bem([className])} style={style}>
      <div className={bem('content')}>
        {columns.map((column, index) => (
          <Wheel
            key={+index}
            dataSource={column}
            value={innerValue?.[index]}
            fieldNames={fieldNames}
            itemRender={itemRender ? (item) => itemRender(item, index) : undefined}
            disabled={disabled}
            onChange={(selected: WheelValue) => onValueChange(selected, index)}
            stopScroll={stopScroll}
          />
        ))}
      </div>
      <div className={bem('mask', [{ top: true }])} />
      <div className={bem('mask', [{ bottom: true }])} />
    </div>
  );
});

PickerView.defaultProps = {
  defaultValue: [],
  dataSource: [],
  cols: Infinity,
  disabled: false,
};

export default PickerView;
