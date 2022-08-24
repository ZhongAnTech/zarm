import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { Success as SuccessIcon, Minus as MinusIcon } from '@zarm-design/icons';
import { ConfigContext } from '../n-config-provider';
import Button from '../button';
import List from '../list';
import type { BaseCheckboxProps, BaseCheckboxGroupProps } from './interface';
import type { ListItemProps } from '../list';
import type { ButtonProps } from '../button';
import type { HTMLProps } from '../utils/utilityTypes';

export interface CheckboxCssVars {
  '--widget-size'?: React.CSSProperties['height'];
  '--widget-background'?: React.CSSProperties['background'];
  '--widget-border-radius'?: React.CSSProperties['borderRadius'];
  '--widget-border-width'?: React.CSSProperties['borderWidth'];
  '--widget-border-color'?: React.CSSProperties['borderColor'];
  '--marker-font-size'?: React.CSSProperties['fontSize'];
  '--marker-color'?: React.CSSProperties['color'];
  '--marker-transition'?: React.CSSProperties['transition'];
  '--text-margin-horizontal'?: React.CSSProperties['marginLeft'];
  '--active-opacity'?: React.CSSProperties['opacity'];
  '--checked-widget-background'?: React.CSSProperties['background'];
  '--checked-widget-border-color'?: React.CSSProperties['borderColor'];
  '--checked-marker-color'?: React.CSSProperties['color'];
  '--disabled-widget-background'?: React.CSSProperties['background'];
  '--disabled-widget-border-color'?: React.CSSProperties['borderColor'];
  '--disabled-text-color'?: React.CSSProperties['color'];
  '--disabled-marker-color'?: React.CSSProperties['color'];
  '--group-spacing-vertical'?: React.CSSProperties['marginBottom'];
  '--group-spacing-horizontal'?: React.CSSProperties['marginRight'];
}

const getChecked = (props: CheckboxProps, defaultChecked?: boolean) => {
  return props.checked ?? props.defaultChecked ?? defaultChecked;
};

type CheckboxNormalProps = BaseCheckboxProps &
  HTMLProps<CheckboxCssVars> & {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

type CheckboxButtonProps = CheckboxNormalProps &
  ButtonProps &
  Pick<BaseCheckboxGroupProps, 'buttonGhost' | 'buttonSize' | 'buttonShape'>;

export type CheckboxProps = Partial<CheckboxNormalProps & CheckboxButtonProps>;

const Checkbox = React.forwardRef<unknown, CheckboxButtonProps>((props, ref) => {
  const {
    className,
    type,
    value,
    checked,
    defaultChecked,
    disabled,
    id,
    listMarkerAlign,
    indeterminate,
    buttonGhost,
    buttonShape,
    buttonSize,
    children,
    onChange,
    ...restProps
  } = props;
  const checkboxRef = (ref as any) || React.createRef<HTMLElement>();
  const [currentChecked, setCurrentChecked] = React.useState(
    getChecked({ checked, defaultChecked }),
  );

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('checkbox', { prefixCls });

  const cls = bem([
    {
      checked: currentChecked,
      disabled,
      untext: !children,
      indeterminate,
    },
    className,
  ]);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }
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
      className={bem('input')}
      disabled={disabled}
      value={value}
      defaultChecked={'defaultChecked' in props ? defaultChecked : undefined}
      checked={'checked' in props ? currentChecked : undefined}
      onChange={onValueChange}
    />
  );

  const checkboxRender = (
    <span ref={checkboxRef} className={cls} {...(restProps as CheckboxNormalProps)}>
      <span className={bem('widget')}>
        <span className={bem('inner')}>
          {indeterminate ? (
            <MinusIcon className={bem('marker')} />
          ) : (
            <SuccessIcon className={bem('marker')} />
          )}
        </span>
      </span>
      {children && <span className={bem('text')}>{children}</span>}
      {inputRender}
    </span>
  );

  React.useEffect(() => {
    setCurrentChecked(getChecked({ checked, defaultChecked }));
  }, [checked, defaultChecked]);

  if (type === 'list') {
    const marker = (
      <>
        <span className={bem('widget')}>
          <span className={bem('inner')}>
            <SuccessIcon className={bem('marker')} />
          </span>
        </span>
        {inputRender}
      </>
    );

    const listProps: ListItemProps = {
      hasArrow: false,
      className: cls,
      title: (
        <>
          {children && <span className={bem('text')}>{children}</span>}
          {inputRender}
        </>
      ),
      onClick: !disabled ? () => {} : undefined,
    };

    listMarkerAlign === 'after' ? (listProps.after = marker) : (listProps.prefix = marker);

    return <List.Item ref={checkboxRef} {...listProps} />;
  }

  if (type === 'button') {
    return (
      <Button
        ref={checkboxRef}
        className={cls}
        disabled={disabled}
        theme={checked ? 'primary' : 'default'}
        ghost={buttonGhost && checked}
        shape={buttonShape}
        size={buttonSize}
        {...(restProps as CheckboxButtonProps)}
      >
        {children}
        {inputRender}
      </Button>
    );
  }

  return checkboxRender;
});

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  disabled: false,
  indeterminate: false,
};

export default Checkbox;
