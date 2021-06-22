import * as React from 'react';
import classnames from 'classnames';
import type { BaseRadioProps } from './interface';
import RadioGroup from './RadioGroup';
import Cell from '../cell';

const getChecked = (props: RadioProps, defaultChecked: boolean) => {
  if (typeof props.checked !== 'undefined') {
    return props.checked;
  }
  if (typeof props.defaultChecked !== 'undefined') {
    return props.defaultChecked;
  }
  return defaultChecked;
};

type RadioSpanProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'
>;
type RadioCellProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'
>;
type RadioButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'
>;

export type RadioProps = Partial<RadioSpanProps & RadioCellProps & RadioButtonProps> &
  BaseRadioProps & {
    prefixCls?: string;
    className?: string;
  };

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
  Group: typeof RadioGroup;
}

const Radio = React.forwardRef<unknown, RadioProps>((props, ref) => {
  const {
    prefixCls,
    className,
    type,
    value,
    checked,
    shape,
    defaultChecked,
    disabled,
    id,
    children,
    onChange,
    ...rest
  } = props;

  const radioRef = (ref as any) || React.createRef<HTMLElement>();
  const [currentCheck, setCurrentCheck] = React.useState(
    getChecked({ checked, defaultChecked }, false),
  );

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }
    const newChecked = !currentCheck;
    if (!('checked' in props)) {
      setCurrentCheck(newChecked);
    }

    if (typeof onChange === 'function') {
      onChange(e);
    }
  };

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--checked`]: currentCheck,
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--untext`]: !children,
  });

  const inputRender = (
    <input
      id={id}
      type="radio"
      className={`${prefixCls}__input`}
      value={value}
      disabled={disabled}
      checked={currentCheck}
      onChange={onValueChange}
    />
  );

  React.useEffect(() => {
    setCurrentCheck(getChecked({ checked, defaultChecked }, false));
  }, [checked, defaultChecked]);

  const radioRender = (
    <span className={cls} {...(rest as RadioSpanProps)} ref={radioRef}>
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
        {...(rest as RadioCellProps)}
      >
        {radioRender}
      </Cell>
    );
  }

  if (type === 'button') {
    return (
      <button
        type="button"
        disabled={disabled}
        className={cls}
        ref={radioRef}
        {...(rest as RadioButtonProps)}
      >
        {children}
        {inputRender}
      </button>
    );
  }

  return radioRender;
}) as CompoundedComponent;

Radio.displayName = 'Radio';
Radio.defaultProps = {
  prefixCls: 'za-radio',
  disabled: false,
  shape: 'radius',
};

export default Radio;
