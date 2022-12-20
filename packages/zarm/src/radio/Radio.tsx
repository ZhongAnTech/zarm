import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { Success as SuccessIcon } from '@zarm-design/icons';
import type { BaseRadioProps, BaseRadioGroupProps } from './interface';
import Button from '../button';
import List from '../list';
import type { ListItemProps } from '../list';
import { ConfigContext } from '../config-provider';
import type { ButtonProps } from '../button';
import type { HTMLProps } from '../utils/utilityTypes';

export interface RadioCssVars {
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
}

const getChecked = (props: RadioProps, defaultChecked: boolean) => {
  return props.checked ?? props.defaultChecked ?? defaultChecked;
};

type RadioNormalProps = BaseRadioProps &
  HTMLProps<RadioCssVars> & {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

type RadioButtonProps = RadioNormalProps &
  ButtonProps &
  Pick<BaseRadioGroupProps, 'buttonGhost' | 'buttonSize' | 'buttonShape'>;

export type RadioProps = Partial<RadioNormalProps & RadioButtonProps>;

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
    buttonGhost,
    buttonShape,
    buttonSize,
    children,
    onChange,
    ...restProps
  } = props;

  const radioRef = (ref as any) || React.createRef<HTMLElement>();
  const [currentChecked, setCurrentChecked] = React.useState(
    getChecked({ checked, defaultChecked }, false),
  );

  const { prefixCls } = React.useContext(ConfigContext);

  const bem = createBEM('radio', { prefixCls });

  const cls = bem([
    {
      checked: currentChecked,
      disabled,
      untext: !children,
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

    onChange?.(e);
  };

  const inputRender = (
    <input
      id={id}
      type="radio"
      aria-checked={currentChecked}
      className={bem('input')}
      disabled={disabled}
      value={value}
      defaultChecked={'defaultChecked' in props ? defaultChecked : undefined}
      checked={'checked' in props ? currentChecked : undefined}
      onChange={onValueChange}
    />
  );

  const radioRender = (
    <span ref={radioRef} className={cls} {...(restProps as RadioNormalProps)}>
      <span className={bem('widget')}>
        <span className={bem('inner')}>
          <SuccessIcon className={bem('marker')} />
        </span>
      </span>
      {children && <span className={bem('text')}>{children}</span>}
      {inputRender}
    </span>
  );

  React.useEffect(() => {
    setCurrentChecked(getChecked({ checked, defaultChecked }, false));
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

    listMarkerAlign === 'after' ? (listProps.suffix = marker) : (listProps.prefix = marker);

    return <List.Item ref={radioRef} {...listProps} />;
  }

  if (type === 'button') {
    return (
      <Button
        ref={radioRef}
        className={cls}
        disabled={disabled}
        theme={checked ? 'primary' : 'default'}
        ghost={buttonGhost && checked}
        shape={buttonShape}
        size={buttonSize}
        {...(restProps as RadioButtonProps)}
      >
        {children}
        {inputRender}
      </Button>
    );
  }

  return radioRender;
});

Radio.displayName = 'Radio';

Radio.defaultProps = {
  disabled: false,
};

export default Radio;
