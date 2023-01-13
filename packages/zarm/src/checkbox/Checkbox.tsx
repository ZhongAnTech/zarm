import { createBEM } from '@zarm-design/bem';
import { Minus as MinusIcon, Success as SuccessIcon } from '@zarm-design/icons';
import * as React from 'react';
import Button from '../button';
import { ConfigContext } from '../config-provider';
import type { ListItemProps } from '../list';
import List from '../list';
import type { HTMLProps } from '../utils/utilityTypes';
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

const getChecked = (props: CheckboxProps, defaultChecked?: boolean) => {
  return props.checked ?? props.defaultChecked ?? defaultChecked;
};

export type CheckboxProps = BaseCheckboxProps &
  HTMLProps<CheckboxCssVars> & {
    renderIcon?: (props: CheckboxProps) => React.ReactNode;
    render?: (props: CheckboxProps) => React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

const Checkbox = React.forwardRef<unknown, CheckboxProps>((props, ref) => {
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
    renderIcon,
    render,
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

  const currentProps = { ...props, checked: currentChecked };

  const labelRender = children && <span className={bem('text')}>{children}</span>;

  let iconRender = (
    <span className={bem('icon')}>
      <span className={bem('icon-inner')}>
        {renderIcon ? (
          renderIcon(currentProps)
        ) : (
          <span className={bem('tick')}>
            {indeterminate ? (
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
    <span ref={checkboxRef} className={cls} {...restProps}>
      {render ? (
        render(currentProps)
      ) : (
        <>
          {iconRender}
          {labelRender}
        </>
      )}
      {inputRender}
    </span>
  );

  React.useEffect(() => {
    setCurrentChecked(getChecked({ checked, defaultChecked }));
  }, [checked, defaultChecked]);

  if (type === 'button') {
    iconRender = null;

    return (
      <Button
        ref={checkboxRef}
        className={cls}
        size="xs"
        disabled={disabled}
        theme={currentChecked ? 'primary' : 'default'}
        {...restProps}
      >
        {children}
        {inputRender}
      </Button>
    );
  }

  if (type === 'list') {
    const listProps: ListItemProps = {
      hasArrow: false,
      className: cls,
      title: (
        <>
          {labelRender}
          {inputRender}
        </>
      ),
      onClick: !disabled ? () => {} : undefined,
    };

    listMarkerAlign === 'after' ? (listProps.suffix = iconRender) : (listProps.prefix = iconRender);

    return <List.Item ref={checkboxRef} {...listProps} />;
  }

  return checkboxRender;
});

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  disabled: false,
  indeterminate: false,
};

export default Checkbox;
