import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import isEqual from 'lodash/isEqual';
import Picker from '../picker';
import parseProps from '../picker-view/utils/parseProps';
import type { BaseSelectProps } from './interface';
import type { WheelItem } from '../wheel/interface';
import { ConfigContext } from '../n-config-provider';
import { HTMLProps } from '../utils/utilityTypes';

export interface SelectCssVars {
  '--height': React.CSSProperties['height'];
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

const Select = React.forwardRef<unknown, SelectProps>((props, ref) => {
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
    ...others
  } = props;

  const container = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls, locale } = React.useContext(ConfigContext);
  const bem = createBEM('select', { prefixCls });
  const [innerValue, setInnerValue] = React.useState(parseProps.getSource(props).value);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (props.value === undefined) return;
    if (isEqual(props.value, innerValue)) return;
    setInnerValue(parseProps.getSource(props).value);
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
        className={bem([
          {
            placeholder: !innerValue.length,
            disabled,
          },
        ])}
        onClick={handleClick}
        ref={container}
      >
        <div className={bem('input')}>
          <div className={bem('value')}>
            {(innerValue.length && displayRender!(parseProps.getSource(props).objValue || [])) ||
              placeholder ||
              locale?.Select?.placeholder}
          </div>
        </div>
        <div className={bem('arrow', [{ active: visible }])} />
      </div>
      <Picker
        {...others}
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
  displayRender: (selected) => selected?.map((item) => item && item.label),
  onClick: () => {},
};

export default Select;
