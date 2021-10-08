import * as React from 'react';
import classnames from 'classnames';
import { Success as SuccessIcon } from '@zarm-design/icons';
import type { BaseRadioProps } from './interface';
import RadioGroup from './RadioGroup';
import List from '../list';
import type { ListItemProps } from '../list';
import { ConfigContext } from '../n-config-provider';

const getChecked = (props: RadioProps, defaultChecked: boolean) => {
  return props.checked ?? props.defaultChecked ?? defaultChecked;
};

type RadioSpanProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'
>;
type RadioListProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'
>;
type RadioButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'defaultChecked' | 'checked' | 'value' | 'onChange'
>;

export type RadioProps = Partial<RadioSpanProps & RadioListProps & RadioButtonProps> &
  BaseRadioProps & {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
  Group: typeof RadioGroup;
}

const Radio = React.forwardRef<unknown, RadioProps>((props, ref) => {
  const {
    className,
    type,
    value,
    checked,
    defaultChecked,
    disabled,
    id,
    listMarkerAlign,
    children,
    onChange,
    ...restProps
  } = props;

  const radioRef = (ref as any) || React.createRef<HTMLElement>();
  const [currentChecked, setCurrentChecked] = React.useState(
    getChecked({ checked, defaultChecked }, false),
  );

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-radio`;

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--checked`]: currentChecked,
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--untext`]: !children,
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
      type="radio"
      className={`${prefixCls}__input`}
      value={value}
      disabled={disabled}
      defaultChecked={'defaultChecked' in props ? defaultChecked : undefined}
      checked={'checked' in props ? currentChecked : undefined}
      onChange={onValueChange}
    />
  );

  const radioRender = (
    <span ref={radioRef} className={cls} {...(restProps as RadioSpanProps)}>
      <span className={`${prefixCls}__widget`}>
        <span className={`${prefixCls}__inner`}>
          <SuccessIcon className={`${prefixCls}__marker`} />
        </span>
      </span>
      {children && <span className={`${prefixCls}__text`}>{children}</span>}
      {inputRender}
    </span>
  );

  React.useEffect(() => {
    setCurrentChecked(getChecked({ checked, defaultChecked }, false));
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
    
    listMarkerAlign === 'after'
      ? listProps.after = marker
      : listProps.prefix = marker;

    return <List.Item ref={radioRef} {...listProps} />;
  }

  if (type === 'button') {
    return (
      <button
        ref={radioRef}
        type="button"
        disabled={disabled}
        className={cls}
        {...(restProps as RadioButtonProps)}
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
  disabled: false,
};

export default Radio;
