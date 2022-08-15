import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import isEqual from 'lodash/isEqual';
import Wheel from '../wheel';
import { isCascader } from '../utils/validate';
import parseProps from './utils/parseProps';
import removeFnFromProps from './utils/removeFnFromProps';
import type { BasePickerViewProps } from './interface';
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

const PickerView = React.forwardRef<HTMLDivElement, PickerViewProps>((props, ref) => {
  const { className, style, cols, valueMember, itemRender, disabled, stopScroll, onChange } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('picker-view', { prefixCls });
  const [state, setState] = React.useState({
    props,
    ...parseProps.getSource(props),
  });

  if (
    !isEqual(removeFnFromProps(props, ['onChange']), removeFnFromProps(state.props, ['onChange']))
  ) {
    setState({
      ...state,
      ...parseProps.getSource(props),
      props,
    });
  }

  const onValueChange = (selected: WheelValue, level: number) => {
    const value = state.value.slice();
    const { dataSource } = props;

    if (isCascader({ dataSource })) {
      value.length = level + 1;
    }
    value[level] = selected;
    const next = parseProps.getSource({ dataSource, value, valueMember, cols });
    setState({
      ...state,
      ...next,
    });
    onChange?.(next.objValue, level);
  };

  const { dataSource, value } = state;

  return (
    <div ref={ref} className={bem([className])} style={style}>
      <div className={bem('content')}>
        {dataSource.map((item, index) => (
          <Wheel
            key={+index}
            dataSource={item}
            value={value[index]}
            valueMember={props.valueMember}
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
  dataSource: [],
  cols: Infinity,
  valueMember: 'value',
  itemRender: (data) => data.label,
  disabled: false,
};

export default PickerView;
