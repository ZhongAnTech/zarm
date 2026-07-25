import { createBEM } from '@zarm-design/bem';
import isEqual from 'lodash/isEqual';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { useSafeState } from '../utils/hooks';
import mergeDefaultProps from '../utils/mergeDefaultProps';
import type { HTMLProps } from '../utils/utilityTypes';
import type { WheelInstance } from '../wheel';
import Wheel from '../wheel';
import type { WheelValue } from '../wheel/interface';
import type { BasePickerViewProps, PickerColumnItem } from './interface';
import { isCascader, resolved } from './utils';

export interface PickerViewCssVars {
  '--background': React.CSSProperties['background'];
  '--padding': React.CSSProperties['padding'];
  '--mask-start-background': React.CSSProperties['background'];
  '--mask-end-background': React.CSSProperties['background'];
  '--wheel-item-rows': number;
  '--wheel-item-height': React.CSSProperties['height'];
  '--wheel-item-font-size': React.CSSProperties['fontSize'];
  '--wheel-item-text-color': React.CSSProperties['color'];
  '--wheel-item-disabled-text-color': React.CSSProperties['color'];
  '--wheel-item-selected-background': React.CSSProperties['background'];
  '--wheel-item-selected-border-radius': React.CSSProperties['borderRadius'];
}

export type PickerViewProps = BasePickerViewProps & HTMLProps<PickerViewCssVars>;

export interface PickerViewInstance {
  value: WheelValue[];
  items: PickerColumnItem[];
  reset: () => void;
  stop: () => {
    value: WheelValue[];
    items: PickerColumnItem[];
  };
}

const PickerView = React.forwardRef<PickerViewInstance, PickerViewProps>((props, ref) => {
  props = mergeDefaultProps(defaultProps, props);
  const { className, style, cols, dataSource, fieldNames, itemRender, disabled, onChange } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('picker-view', { prefixCls });
  const [innerValue, setInnerValue] = React.useState(resolved(props).value);
  const [stopScroll, setStopScroll] = useSafeState(false);
  const wheelRefs = React.useRef<Array<WheelInstance | null>>([]);

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

  const stop = () => {
    const value = innerValue.slice();
    const cascader = isCascader(props.dataSource);

    columns.some((_, index) => {
      const selected = wheelRefs.current[index]?.stop();
      if (selected === undefined) return false;

      const changed = selected !== value[index];
      value[index] = selected;
      if (cascader && changed) {
        value.length = index + 1;
        return true;
      }
      return false;
    });

    const next = resolved({ ...props, value });
    if (!isEqual(next.value, innerValue)) {
      setInnerValue(next.value);
    }
    return next;
  };

  React.useImperativeHandle(ref, () => ({
    value: innerValue,
    items,
    reset,
    stop,
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
            ref={(instance) => {
              wheelRefs.current[index] = instance;
            }}
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

const defaultProps: Partial<PickerViewProps> = {
  defaultValue: [],
  dataSource: [],
  cols: Infinity,
  disabled: false,
};

export default PickerView;
