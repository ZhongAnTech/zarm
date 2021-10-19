import React, { forwardRef, useState, useContext, useEffect } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import Wheel from '../wheel';
import { isCascader } from '../utils/validate';
import parseProps from './utils/parseProps';

import type { BasePickerViewProps } from './interface';
import type { WheelValue } from '../wheel/interface';

export type PickerViewProps = BasePickerViewProps & React.HTMLAttributes<HTMLDivElement>;

const PickerView = forwardRef<HTMLDivElement, PickerViewProps>((props, ref) => {
  const {
    className,
    valueMember,
    itemRender,
    disabled,
    stopScroll,
    onChange,
    dataSource,
    cols,
  } = props;
  const [state, setState] = useState(parseProps.getSource(props));

  const { prefixCls: globalPrefixCls } = useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-picker-view`;
  const cls = classnames(prefixCls, className);

  const onValueChange = (selected: WheelValue, level: number) => {
    const value = state.value.slice();
    if (isCascader({ dataSource })) {
      value.length = level + 1;
    }

    value[level] = selected;
    const newState = parseProps.getSource({ dataSource, value, valueMember, cols });
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
      />
    ));
  };

  useEffect(() => {
    setState(parseProps.getSource(props));
  }, [dataSource]);

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
