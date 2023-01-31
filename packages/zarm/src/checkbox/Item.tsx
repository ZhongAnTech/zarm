import { createBEM } from '@zarm-design/bem';
import { Minus as MinusIcon, Success as SuccessIcon } from '@zarm-design/icons';
import React, { forwardRef, useContext, useEffect, useImperativeHandle } from 'react';
import { ConfigContext } from '../config-provider';
import { useControllableValue } from '../utils/hooks';
import type { HTMLProps } from '../utils/utilityTypes';
import { CheckboxGroupContext } from './context';
import type { BaseCheckboxProps } from './interface';
import NativeInput from './NativeInput';

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
    renderIcon?: (props: CheckboxProps) => React.ReactNode;
    render?: (props: CheckboxProps) => React.ReactNode;
  };

export type CheckboxRef = {
  check: () => void;
  uncheck: () => void;
  toggle: () => void;
};

const getChecked = (props: CheckboxProps, defaultChecked?: boolean) => {
  return props.checked ?? props.defaultChecked ?? defaultChecked;
};

const Checkbox = forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
  const [checked, setChecked] = useControllableValue<boolean>(props, {
    defaultValue: props.defaultChecked,
    defaultValuePropName: 'defaultChecked',
    valuePropName: 'checked',
  });

  const groupContext = useContext(CheckboxGroupContext);

  const { prefixCls } = useContext(ConfigContext);
  const bem = createBEM('checkbox', { prefixCls });
  const cls = bem([
    {
      checked,
      disabled: props.disabled,
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

  const checkboxRender = (
    <label className={cls}>
      <NativeInput
        id={props.id}
        type="checkbox"
        className={bem('input')}
        disabled={props.disabled}
        defaultChecked={props.defaultChecked}
        checked={'checked' in props ? checked : undefined}
        onChange={setChecked}
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

  useImperativeHandle(ref, () => ({
    check: () => {
      setChecked(true);
    },
    uncheck: () => {
      setChecked(false);
    },
    toggle: () => {
      setChecked(!checked);
    },
  }));

  useEffect(() => {
    if (groupContext && props.value !== undefined) {
      const currentChecked = groupContext.value.includes(props.value);
      if (currentChecked) {
        groupContext.check(props.value);
      } else {
        groupContext.uncheck(props.value);
      }
      setChecked(currentChecked);
      props.onChange?.(currentChecked);
    }
  }, [props.value, props.onChange]);

  return checkboxRender;
});

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  disabled: false,
  indeterminate: false,
};

export default Checkbox;
