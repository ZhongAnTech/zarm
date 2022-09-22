import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import isEqual from 'lodash/isEqual';
import Wheel from '../wheel';
import { isCascader } from '../utils/validate';
import parseProps from './utils/parseProps';
import type { BasePickerViewProps, PickerDataSourceItem } from './interface';
import type { WheelValue } from '../wheel/interface';
import { ConfigContext } from '../n-config-provider';
import type { HTMLProps } from '../utils/utilityTypes';

export type PickerViewProps = BasePickerViewProps &
  HTMLProps<{
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
  }>;

export interface PickerViewInstance {
  value: WheelValue[];
  dataSource: PickerDataSourceItem[];
}

const DEFAULT_FIELD_NAMES = {
  value: 'value',
  label: 'label',
  children: 'children',
};

const PickerView = React.forwardRef<PickerViewInstance, PickerViewProps>((props, ref) => {
  const { className, style, cols, itemRender, disabled, stopScroll, onChange } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('picker-view', { prefixCls });
  const fieldNames = { ...DEFAULT_FIELD_NAMES, ...props.fieldNames };
  const restProps = { ...props, fieldNames };

  const [innerValue, setInnerValue] = React.useState(parseProps.getSource(restProps).value);

  React.useEffect(() => {
    if (props.value === undefined) return;
    if (isEqual(props.value, innerValue)) return;
    setInnerValue(parseProps.getSource(restProps).value);
  }, [props.value]);

  const { dataSource, objValue } = React.useMemo(
    () => parseProps.getSource({ ...restProps, value: innerValue }),
    [fieldNames.value, fieldNames.children, cols, innerValue, props.dataSource],
  );

  React.useImperativeHandle(ref, () => ({ value: innerValue, dataSource: objValue }));

  const onValueChange = (selected: WheelValue, level: number) => {
    const value = innerValue.slice();
    if (isCascader({ dataSource: props.dataSource })) {
      value.length = level + 1;
    }
    value[level] = selected;
    const next = parseProps.getSource({ ...restProps, value });
    setInnerValue(next.value);
    onChange?.(next.value, next.objValue);
  };

  return (
    <div className={bem([className])} style={style}>
      <div className={bem('content')}>
        {dataSource.map((item, index) => (
          <Wheel
            key={+index}
            dataSource={item}
            value={innerValue?.[index]}
            fieldNames={fieldNames}
            itemRender={itemRender}
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
