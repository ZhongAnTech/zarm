import { createBEM } from '@zarm-design/bem';
import { Minus as MinusIcon, Success as SuccessIcon } from '@zarm-design/icons';
import React, {
  ChangeEvent,
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Button from '../button';
import { ConfigContext } from '../config-provider';
import List from '../list';
import type { HTMLProps } from '../utils/utilityTypes';
import { RadioGroupContext } from './context';
import type { BaseRadioProps } from './interface';

export interface RadioCssVars {
  '--icon-size'?: React.CSSProperties['height'];
  '--icon-background'?: React.CSSProperties['background'];
  '--icon-border-radius'?: React.CSSProperties['borderRadius'];
  '--icon-border-width'?: React.CSSProperties['borderWidth'];
  '--icon-border-color'?: React.CSSProperties['borderColor'];
  '--tick-font-size'?: React.CSSProperties['fontSize'];
  '--tick-color'?: React.CSSProperties['color'];
  '--tick-transition'?: React.CSSProperties['transition'];
  '--text-margin-horizontal'?: React.CSSProperties['marginLeft'];
  '--active-opacity'?: React.CSSProperties['opacity'];
  '--checked-icon-background'?: React.CSSProperties['background'];
  '--checked-icon-border-color'?: React.CSSProperties['borderColor'];
  '--checked-tick-color'?: React.CSSProperties['color'];
  '--disabled-icon-background'?: React.CSSProperties['background'];
  '--disabled-icon-border-color'?: React.CSSProperties['borderColor'];
  '--disabled-text-color'?: React.CSSProperties['color'];
  '--disabled-tick-color'?: React.CSSProperties['color'];
  '--group-spacing-vertical'?: React.CSSProperties['marginBottom'];
  '--group-spacing-horizontal'?: React.CSSProperties['marginRight'];
}

export type RadioProps = BaseRadioProps &
  HTMLProps<RadioCssVars> & {
    renderIcon?: (props: RadioProps) => ReactNode;
    render?: (props: RadioProps) => ReactNode;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  };

const getChecked = (props: RadioProps, defaultChecked?: boolean) => {
  return props.checked ?? props.defaultChecked ?? defaultChecked;
};

export interface RadioRef {
  check: () => void;
};

const Radio = forwardRef<RadioRef, RadioProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  let [checked, setChecked] = useState(getChecked(props, false));
  let { disabled } = props;

  const groupContext = useContext(RadioGroupContext);
  if (groupContext && props.value !== undefined) {
    checked = groupContext.value === props.value;
    setChecked = (changedChecked: boolean) => {
      if (changedChecked) {
        groupContext.check(props.value)
      }
    };
    disabled = disabled || groupContext.disabled;
  }

  const { prefixCls } = useContext(ConfigContext);
  const bem = createBEM('radio', { prefixCls });
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

  const textRender = props.children && <span className={bem('text')}>{props.children}</span>;

  const iconRender = (
    <span className={bem('icon')}>
      {props.renderIcon ? (
        props.renderIcon(currentProps)
      ) : (
        <span className={bem('tick')}>{props.indeterminate ? <MinusIcon /> : <SuccessIcon />}</span>
      )}
    </span>
  );

  const inputRender = (
    <input
      ref={inputRef}
      id={props.id}
      type="radio"
      className={bem('input')}
      aria-checked={checked}
      disabled={disabled}
      value={props.value}
      checked={checked}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;

        if (!('checked' in props)) {
          setChecked(e.target.checked);
        }
        props.onChange?.(e);
      }}
    />
  );

  useImperativeHandle(ref, () => {
    return {
      check: () => {
        if (checked) return;
        inputRef.current.click();
      },
    };
  });

  useEffect(() => {
    if (props.checked === undefined) return;
    if (props.checked === checked) return;

    setChecked(getChecked({ checked: props.checked, defaultChecked: props.defaultChecked }, false));
  }, [props.checked, props.defaultChecked]);

  if (groupContext?.type === 'button') {
    return (
      <label className={cls} style={props.style}>
        {inputRender}
        <Button
          disabled={disabled}
          theme={checked ? 'primary' : 'default'}
          size="xs"
          block={groupContext?.block}
          onClick={() => {
            inputRef.current.click();
          }}
        >
          {props.children}
        </Button>
      </label>
    );
  }

  if (groupContext?.type === 'list') {
    const tickRender = (
      <>
        {inputRender}
        {iconRender}
      </>
    );

    return (
      <List.Item
        hasArrow={false}
        className={cls}
        style={props.style}
        prefix={groupContext?.listIconAlign === 'before' ? tickRender : undefined}
        suffix={groupContext?.listIconAlign === 'after' ? tickRender : undefined}
        title={textRender}
        onClick={
          !disabled
            ? () => {
                if (disabled) return;
                inputRef.current.click();
              }
            : undefined
        }
      />
    );
  }

  const contentRender = props.render ? (
    props.render(currentProps)
  ) : (
    <>
      {iconRender}
      {textRender}
    </>
  );

  return (
    <label className={cls} style={props.style}>
      {inputRender}
      {contentRender}
    </label>
  );
});

Radio.displayName = 'Radio';

Radio.defaultProps = {
  indeterminate: false,
};

export default Radio;
