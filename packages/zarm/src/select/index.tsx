import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import Picker from '../picker';
import parseProps from '../picker-view/utils/parseProps';
import type { BaseSelectProps } from './interface';
import type { WheelItem } from '../wheel/interface';
import { ConfigContext } from '../n-config-provider';

export interface SelectProps
  extends BaseSelectProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {}
export interface SelectState {
  selectValue: Array<WheelItem>;
  visible: boolean;
}

const Select = React.forwardRef<unknown, SelectProps>((props, ref) => {
  const {
    placeholder,
    className,
    disabled,
    displayRender,
    locale,
    value,
    onChange,
    onCancel,
    onOk,
    defaultValue,
    ...others
  } = props;

  const container = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls: globalPrefixCls, locale: globalLocal } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-select`;

  const [state, setState] = useState<SelectState>({
    visible: false,
    selectValue:
      parseProps.isValueValid(props.defaultValue || props.value) &&
      parseProps.getSource(props).objValue,
  });

  useEffect(() => {
    setState({
      visible: state.visible,
      selectValue:
        parseProps.isValueValid(defaultValue || value) &&
        parseProps.getSource({
          dataSource: props.dataSource,
          defaultValue,
          value,
          valueMember: props.valueMember,
          cols: props.cols,
        }).objValue,
    });
  }, [defaultValue, value, props.dataSource, props.valueMember, props.cols, state.visible]);

  const handleClick = useCallback(() => {
    if (disabled) {
      return false;
    }
    setState({
      ...state,
      visible: true,
    });
  }, [disabled, state]);

  const hanldeChange = useCallback(
    (selected) => {
      if (typeof onChange === 'function') {
        onChange(selected);
      }
    },
    [onChange],
  );

  const handleOnOk = useCallback(
    (selected) => {
      setState({
        selectValue: selected,
        visible: false,
      });
      if (typeof onOk === 'function') {
        onOk(selected);
      }
    },
    [onOk],
  );

  // 点击取消
  const handleOnCancel = useCallback(() => {
    setState({
      ...state,
      visible: false,
    });

    if (typeof onCancel === 'function') {
      onCancel();
    }
  }, [onCancel, state]);
  const { visible, selectValue = [] } = state;

  const cls = classnames(prefixCls, {
    [`${prefixCls}--placeholder`]: !selectValue.length,
    [`${prefixCls}--disabled`]: disabled,
  });

  const arrowRender = <div className={`${prefixCls}__arrow`} />;

  return (
    <div className={cls} onClick={handleClick} ref={container}>
      <div className={`${prefixCls}__input`}>
        <div className={`${prefixCls}__value`}>
          {(selectValue.length && displayRender!(selectValue || [])) ||
            placeholder ||
            globalLocal?.Select?.placeholder}
        </div>
      </div>
      {arrowRender}
      <Picker
        {...others}
        className={className}
        visible={visible}
        value={value}
        onOk={handleOnOk}
        onChange={hanldeChange}
        onCancel={handleOnCancel}
      />
    </div>
  );
});

Select.displayName = 'Select';

Select.defaultProps = {
  dataSource: [],
  valueMember: 'value',
  itemRender: (data) => data && data.label,
  cols: Infinity,
  maskClosable: true,
  displayRender: (selected) => selected?.map((item) => item && item.label),
  onClick: () => {},
};

export default Select;
