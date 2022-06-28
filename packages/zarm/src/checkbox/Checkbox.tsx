import * as React from 'react';
import classnames from 'classnames';
import { Success as SuccessIcon, Minus as MinusIcon } from '@zarm-design/icons';
import { ConfigContext } from '../n-config-provider';
import Button from '../button';
import List from '../list';
import type { BaseCheckboxProps, BaseCheckboxGroupProps } from './interface';
import type { ListItemProps } from '../list';
import type { ButtonProps } from '../button';
import type { HTMLProps } from '../utils/utilityTypes';

const getChecked = (props: CheckboxProps, defaultChecked?: boolean) => {
  return props.checked ?? props.defaultChecked ?? defaultChecked;
};

type CheckboxNormalProps = BaseCheckboxProps &
  HTMLProps & {
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

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-checkbox`;

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--checked`]: currentChecked,
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--untext`]: !children,
    [`${prefixCls}--indeterminate`]: indeterminate,
  });

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
      className={`${prefixCls}__input`}
      disabled={disabled}
      value={value}
      defaultChecked={'defaultChecked' in props ? defaultChecked : undefined}
      checked={'checked' in props ? currentChecked : undefined}
      onChange={onValueChange}
    />
  );

  const checkboxRender = (
    <span ref={checkboxRef} className={cls} {...(restProps as CheckboxNormalProps)}>
      <span className={`${prefixCls}__widget`}>
        <span className={`${prefixCls}__inner`}>
          {indeterminate ? (
            <MinusIcon className={`${prefixCls}__marker`} />
          ) : (
            <SuccessIcon className={`${prefixCls}__marker`} />
          )}
        </span>
      </span>
      {children && <span className={`${prefixCls}__text`}>{children}</span>}
      {inputRender}
    </span>
  );

  React.useEffect(() => {
    setCurrentChecked(getChecked({ checked, defaultChecked }));
  }, [checked, defaultChecked]);

  if (type === 'list') {
    const marker = (
      <>
        <span className={`${prefixCls}__widget`}>
          <span className={`${prefixCls}__inner`}>
            <SuccessIcon className={`${prefixCls}__marker`} />
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
          {children && <span className={`${prefixCls}__text`}>{children}</span>}
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
