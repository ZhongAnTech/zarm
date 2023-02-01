import { createBEM } from '@zarm-design/bem';
import { Minus as MinusIcon, Success as SuccessIcon } from '@zarm-design/icons';
import includes from 'lodash/includes';
import React, { ChangeEvent, forwardRef, ReactNode, useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import { CheckboxGroupContext } from './context';
import type { BaseCheckboxProps } from './interface';

export interface CheckboxCssVars {
  '--icon-size'?: React.CSSProperties['height'];
  '--icon-background'?: React.CSSProperties['background'];
  '--icon-border-radius'?: React.CSSProperties['borderRadius'];
  '--icon-border-width'?: React.CSSProperties['borderWidth'];
  '--icon-border-color'?: React.CSSProperties['borderColor'];
  '--marker-font-size'?: React.CSSProperties['fontSize'];
  '--marker-color'?: React.CSSProperties['color'];
  '--marker-transition'?: React.CSSProperties['transition'];
  '--text-margin-horizontal'?: React.CSSProperties['marginLeft'];
  '--active-opacity'?: React.CSSProperties['opacity'];
  '--checked-icon-background'?: React.CSSProperties['background'];
  '--checked-icon-border-color'?: React.CSSProperties['borderColor'];
  '--checked-marker-color'?: React.CSSProperties['color'];
  '--disabled-icon-background'?: React.CSSProperties['background'];
  '--disabled-icon-border-color'?: React.CSSProperties['borderColor'];
  '--disabled-text-color'?: React.CSSProperties['color'];
  '--disabled-marker-color'?: React.CSSProperties['color'];
  '--group-spacing-vertical'?: React.CSSProperties['marginBottom'];
  '--group-spacing-horizontal'?: React.CSSProperties['marginRight'];
}

export type CheckboxProps = BaseCheckboxProps &
  HTMLProps<CheckboxCssVars> & {
    renderIcon?: (props: CheckboxProps) => ReactNode;
    render?: (props: CheckboxProps) => ReactNode;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  };

const getChecked = (props: CheckboxProps, defaultChecked?: boolean) => {
  return props.checked ?? props.defaultChecked ?? defaultChecked;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  let [checked, setChecked] = useState(getChecked(props, false));
  let disabled = props.disabled;

  const groupContext = useContext(CheckboxGroupContext);
  if (groupContext && props.value !== undefined) {
    checked = includes(groupContext.value, props.value);
    setChecked = (changedChecked: boolean) => {
      if (changedChecked) {
        groupContext.check(props.value);
      } else {
        groupContext.uncheck(props.value);
      }
    };
    disabled = disabled || groupContext.disabled;
  }

  const { prefixCls } = useContext(ConfigContext);
  const bem = createBEM('checkbox', { prefixCls });
  const cls = bem([
    {
      disabled,
      checked: checked && !props.indeterminate,
      untext: !props.children,
      indeterminate: props.indeterminate,
    },
    props.className,
  ]);

  const currentProps = { ...props, checked };

  const labelRender = props.children && <span className={bem('text')}>{props.children}</span>;

  let iconRender = (
    <span className={bem('icon')}>
      <span className={bem('icon-inner')}>
        {props.renderIcon ? (
          props.renderIcon(currentProps)
        ) : (
          <span className={bem('tick')}>
            {props.indeterminate ? (
              <MinusIcon className={bem('marker')} />
            ) : (
              <SuccessIcon className={bem('marker')} />
            )}
          </span>
        )}
      </span>
    </span>
  );

  useEffect(() => {
    setChecked(getChecked({ checked: props.checked, defaultChecked: props.defaultChecked }, false));
  }, [props.checked, props.defaultChecked]);

  return (
    <label className={cls}>
      <input
        ref={ref}
        id={props.id}
        type="checkbox"
        className={bem('input')}
        disabled={disabled}
        value={props.value}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.stopPropagation();
          if (disabled) return;
          if (groupContext && props.value !== undefined) {
            setChecked(e.target.checked);
          }
          props.onChange?.(e);
        }}
      />
      {props.render ? (
        props.render(currentProps)
      ) : (
        <>
          {iconRender}
          {labelRender}
        </>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  indeterminate: false,
};

export default Checkbox;
