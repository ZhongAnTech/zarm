import * as React from 'react';
import classnames from 'classnames';
import type { BaseCheckboxProps } from './interface';
import CheckboxGroup from './CheckboxGroup';
import Cell from '../cell';
import { ConfigContext } from '../n-config-provider';

const getChecked = (props: CheckboxProps, defaultChecked?: boolean) => {
  return props.checked ?? props.defaultChecked ?? defaultChecked;
};

type CheckboxSpanProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'
>;
type CheckboxCellProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'
>;
type CheckboxButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'
>;

export type CheckboxProps = Partial<CheckboxSpanProps & CheckboxCellProps & CheckboxButtonProps> &
  BaseCheckboxProps & {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLElement>> {
  Group: typeof CheckboxGroup;
}

const Checkbox = React.forwardRef<unknown, CheckboxProps>((props, ref) => {
  const {
    className,
    type,
    shape,
    value,
    checked,
    defaultChecked,
    disabled,
    id,
    indeterminate,
    children,
    onChange,
    ...restProps
  } = props;

  const checkboxRef = (ref as any) || React.createRef<HTMLElement>();
  const [currentChecked, setCurrentChecked] = React.useState(
    getChecked({ checked, defaultChecked }),
  );

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-checkbox`;

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--checked`]: currentChecked,
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--indeterminate`]: indeterminate,
    [`${prefixCls}--untext`]: !children,
  });

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = !currentChecked;
    if (!('checked' in props)) {
      setCurrentChecked(newChecked);
    }

    typeof onChange === 'function' && onChange(e);
  };

  const inputRender = (
    <input
      id={id}
      type="checkbox"
      aria-checked={currentChecked}
      className={`${prefixCls}__input`}
      disabled={disabled}
      value={currentChecked ? 'on' : 'off'}
      defaultChecked={'defaultChecked' in props ? defaultChecked : undefined}
      checked={'checked' in props ? currentChecked : undefined}
      onChange={onValueChange}
    />
  );

  const checkboxRender = (
    <span ref={checkboxRef} className={cls} {...(restProps as CheckboxSpanProps)}>
      <span className={`${prefixCls}__widget`}>
        <span className={`${prefixCls}__inner`} />
      </span>
      {children && <span className={`${prefixCls}__text`}>{children}</span>}
      {inputRender}
    </span>
  );

  React.useEffect(() => {
    setCurrentChecked(getChecked({ checked, defaultChecked }));
  }, [checked, defaultChecked]);

  if (type === 'cell') {
    return <Cell onClick={() => {}}>{checkboxRender}</Cell>;
  }

  if (type === 'button') {
    return (
      <button
        ref={checkboxRef}
        type="button"
        disabled={disabled}
        className={cls}
        {...(restProps as CheckboxButtonProps)}
      >
        {children}
        {inputRender}
      </button>
    );
  }

  return checkboxRender;
}) as CompoundedComponent;

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  shape: 'radius',
  disabled: false,
  indeterminate: false,
};

export default Checkbox;
