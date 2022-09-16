import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { createBEM } from '@zarm-design/bem';
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
    onConfirm,
    defaultValue,
    ...others
  } = props;

  const container = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls, locale: globalLocal } = React.useContext(ConfigContext);
  const bem = createBEM('select', { prefixCls });

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

  const handleonConfirm = useCallback(
    (selected) => {
      setState({
        selectValue: selected,
        visible: false,
      });
      if (typeof onConfirm === 'function') {
        onConfirm(selected);
      }
    },
    [onConfirm],
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

  const cls = bem([
    {
      placeholder: !selectValue.length,
      disabled,
    },
  ]);

  const arrowRender = <div className={bem('arrow')} />;

  return (
    <>
      <div className={cls} onClick={handleClick} ref={container}>
        <div className={bem('input')}>
          <div className={bem('value')}>
            {(selectValue.length && displayRender!(selectValue || [])) ||
              placeholder ||
              globalLocal?.Select?.placeholder}
          </div>
        </div>
        {arrowRender}
      </div>
      <Picker
        {...others}
        className={className}
        visible={visible}
        value={value}
        onConfirm={handleonConfirm}
        onChange={hanldeChange}
        onCancel={handleOnCancel}
      />
    </>
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
