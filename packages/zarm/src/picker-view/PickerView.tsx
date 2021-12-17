import React, { forwardRef, useState, useContext, useEffect, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import Wheel from '../wheel';
import { isCascader } from '../utils/validate';
import parseProps from './utils/parseProps';

import type { WheelValue } from '../wheel/interface';
import type { BasePickerViewProps } from './interface';

export type PickerViewProps = BasePickerViewProps & HTMLAttributes<HTMLElement>;

const PickerView = forwardRef<HTMLDivElement, PickerViewProps>((props, ref) => {
  const {
    className,
    valueMember,
    itemRender,
    disabled,
    stopScroll,
    onChange,
    dataSource,
    value,
    cols,
    onScrollStart,
    onScrollEnd,
  } = props;
  const [state, setState] = useState(parseProps.getSource(props));

  const { prefixCls: globalPrefixCls } = useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-picker-view`;
  const cls = classnames(prefixCls, className);

  const onValueChange = (selected: WheelValue, level: number) => {
    const _value = state.value.slice();
    if (isCascader({ dataSource })) {
      _value.length = level + 1;
    }

    _value[level] = selected;
    const newState = parseProps.getSource({ dataSource, value: _value, valueMember, cols });
    setState(newState);

    if (typeof onChange === 'function') {
      onChange(newState.objValue, level);
    }
  };

  const renderWheel = () => {
    return state.dataSource.map((item: any[], index: number) => (
      <Wheel
        key={+index}
        dataSource={item}
        value={state.value[index]}
        valueMember={valueMember}
        itemRender={itemRender}
        disabled={disabled}
        onChange={(selected: WheelValue) => onValueChange(selected, index)}
        stopScroll={stopScroll}
        onScrollStart={onScrollStart}
        onScrollEnd={onScrollEnd}
      />
    ));
  };

  useEffect(() => {
    setState(parseProps.getSource(props));
  }, [dataSource, value]);

  return (
    <div className={cls} ref={ref}>
      <div className={`${prefixCls}__content`}>{renderWheel()}</div>
      <div className={`${prefixCls}__mask ${prefixCls}__mask--top`} />
      <div className={`${prefixCls}__mask ${prefixCls}__mask--bottom`} />
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
