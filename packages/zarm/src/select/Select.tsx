import { createBEM } from '@zarm-design/bem';
import isEqual from 'lodash/isEqual';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Picker from '../picker';
import { resolved } from '../picker-view/utils';
import { HTMLProps } from '../utils/utilityTypes';
import type { WheelItem } from '../wheel/interface';
import type { BaseSelectProps } from './interface';

export interface SelectCssVars {
  '--height': React.CSSProperties['height'];
  '--disabled-color': React.CSSProperties['color'];
  '--placeholder-color': React.CSSProperties['color'];
  '--arrow-color': React.CSSProperties['color'];
  '--arrow-size': React.CSSProperties['width'];
  '--arrow-width': React.CSSProperties['width'];
}

export type SelectProps = BaseSelectProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> &
  HTMLProps<SelectCssVars>;

export interface SelectState {
  selectValue: Array<WheelItem>;
  visible: boolean;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    placeholder,
    className,
    disabled,
    displayRender,
    value,
    onChange,
    onCancel,
    onConfirm,
    defaultValue,
    ...rest
  } = props;

  const { prefixCls, locale } = React.useContext(ConfigContext);
  const bem = createBEM('select', { prefixCls });
  const [innerValue, setInnerValue] = React.useState(resolved(props).value);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (props.value === undefined) return;
    if (isEqual(props.value, innerValue)) return;
    setInnerValue(resolved(props).value);
  }, [props.value]);

  const handleClick = React.useCallback(() => {
    if (disabled) return;
    setVisible(true);
  }, [disabled]);

  const handleonConfirm = (changedValue, dataSource) => {
    setVisible(false);
    onConfirm?.(changedValue, dataSource);
  };

  const handleOnCancel = () => {
    setVisible(false);
    onCancel?.();
  };

  return (
    <>
      <div
        ref={ref}
        className={bem([
          {
            placeholder: !innerValue.length,
            disabled,
            visible,
          },
        ])}
        onClick={handleClick}
      >
        <div className={bem('input')}>
          <div className={bem('value')}>
            {(innerValue.length && displayRender!(resolved(props).items || [])) ||
              placeholder ||
              locale?.Select?.placeholder}
          </div>
        </div>
        <div className={bem('arrow')} />
      </div>
      <Picker
        {...rest}
        className={className}
        visible={visible}
        value={value}
        onConfirm={handleonConfirm}
        onChange={onChange}
        onCancel={handleOnCancel}
      />
    </>
  );
});

Select.displayName = 'Select';

Select.defaultProps = {
  dataSource: [],
  cols: Infinity,
  maskClosable: true,
  displayRender: (items) => items?.map((item) => item && item.label),
  onClick: () => {},
};

export default Select;
