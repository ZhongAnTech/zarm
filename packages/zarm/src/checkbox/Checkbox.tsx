import React, {
  ChangeEvent,
  InputHTMLAttributes,
  HTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import classnames from 'classnames';
import { BaseCheckboxProps } from './interface';
import CheckboxGroup from './CheckboxGroup';
import Cell from '../cell';

const getChecked = (props: CheckboxProps, defaultChecked: boolean) => {
  return props.checked ?? props.defaultChecked ?? defaultChecked;
};

type CheckboxSpanProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'
>;
type CheckboxCellProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'
>;
type CheckboxButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'
>;

export type CheckboxProps = Partial<CheckboxSpanProps & CheckboxCellProps & CheckboxButtonProps> &
  BaseCheckboxProps & {
    prefixCls?: string;
  };
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLElement>> {
  Group: typeof CheckboxGroup;
}

const Checkbox = React.forwardRef<unknown, CheckboxProps>((props, ref) => {
  const {
    prefixCls,
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
    ...rest
  } = props;

  const [currentCheckd, setCurrentCheckd] = React.useState<boolean>(
    getChecked({ checked, defaultChecked }, false),
  );
  const checkboxRef = (ref as any) || React.createRef<HTMLElement>();

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--checked`]: currentCheckd,
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--indeterminate`]: indeterminate,
    [`${prefixCls}--untext`]: !children,
  });

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }
    const newChecked = !currentCheckd;
    if (typeof checked === 'undefined') {
      setCurrentCheckd(newChecked);
    }
    typeof onChange === 'function' && onChange(e);
  };

  React.useEffect(() => {
    setCurrentCheckd(getChecked({ checked, defaultChecked }, false));
  }, [checked, defaultChecked]);

  const inputRender = (
    <input
      id={id}
      type="checkbox"
      className={`${prefixCls}__input`}
      value={value}
      disabled={disabled}
      checked={currentCheckd}
      onChange={onValueChange}
    />
  );

  const checkboxRender = (
    <span className={cls} ref={checkboxRef} {...(rest as CheckboxSpanProps)}>
      <span className={`${prefixCls}__widget`}>
        <span className={`${prefixCls}__inner`} />
      </span>
      {children && <span className={`${prefixCls}__text`}>{children}</span>}
      {inputRender}
    </span>
  );

  if (type === 'cell') {
    return (
      <Cell
        disabled={disabled}
        className={className}
        onClick={() => {}}
        {...(rest as CheckboxCellProps)}
      >
        {checkboxRender}
      </Cell>
    );
  }

  if (type === 'button') {
    return (
      <button
        ref={checkboxRef}
        type="button"
        disabled={disabled}
        className={cls}
        {...(rest as CheckboxButtonProps)}
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
  prefixCls: 'za-checkbox',
  disabled: false,
  indeterminate: false,
};

export default Checkbox;
