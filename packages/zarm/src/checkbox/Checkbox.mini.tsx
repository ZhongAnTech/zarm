import { BaseEventOrig, Label, Switch, SwitchProps, View } from '@tarojs/components';
import { createBEM } from '@zarm-design/bem';
import { Minus as MinusIcon, Success as SuccessIcon } from '@zarm-design/icons';
import includes from 'lodash/includes';
import React, { ReactNode, useContext, useMemo,  } from 'react';
import { useControllableEventValue } from '../utils/hooks';
import Button from '../button/index.mini';
import { ConfigContext } from '../config-provider';
import List from '../list';
import { nanoid } from '../utils';
import { canUseDOM } from '../utils/dom';
import { HTMLProps } from '../utils/utilityTypes';
import { CheckboxGroupContext } from './context';
import type { BaseCheckboxProps, CheckboxCssVars } from './interface';

export type CheckboxProps = BaseCheckboxProps &
  HTMLProps<CheckboxCssVars> & {
    renderIcon?: (props: CheckboxProps) => ReactNode;
    children?: React.ReactNode | ((props: CheckboxProps) => React.ReactNode);
    onChange?: (value: BaseEventOrig<SwitchProps.onChangeEventDetail>) => void;
  };

// const getChecked = (props: CheckboxProps, defaultChecked?: boolean) => {
//   return props.checked ?? props.defaultChecked ?? defaultChecked;
// };

const Checkbox = (props: CheckboxProps) => {
  // const defaultVal: Partial<{value: boolean, defaultValue: boolean}> = {};
  // if ('checked' in props) {
  //   defaultVal.value = props.checked;
  // }
  // if ('defaultChecked' in props) {
  //   defaultVal.defaultValue = props.defaultChecked;
  // }
  // let [checked, setChecked] = useControllableEventValue({
  //   ...props,
  //   ...defaultVal,
  // });

  // console.log(checked);
  let [checked, setChecked] = useControllableEventValue(props, {
    valuePropName: 'checked',
    defaultValuePropName: 'defaultChecked'
  });
  checked = checked ?? false;

  let { disabled } = props;

  const groupContext = useContext(CheckboxGroupContext);
  if (groupContext && props.value !== undefined) {
    checked = includes(groupContext.value, props.value);
    setChecked = (e: any) => {
      if (e.target.checked === true) {
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

  const children =
    typeof props.children === 'function' ? props.children(currentProps) : props.children;
  const textRender = props.children && <View className={bem('text')}>{children}</View>;

  const iconRender = (
    <View className={bem('icon')}>
      {props.renderIcon ? (
        props.renderIcon(currentProps)
      ) : (
        <View className={bem('tick')}>{props.indeterminate ? <MinusIcon /> : <SuccessIcon />}</View>
      )}
    </View>
  );

  const id = useMemo(() => nanoid(), []);

  const passProps = canUseDOM
    ? {
        nativeProps: {
          id,
        },
      }
    : { id };

  const inputRender = (
    <Switch
      {...passProps}
      className={bem('input')}
      disabled={disabled}
      checked={checked}
      onChange={() => {
        if (disabled) return;
        setChecked({
          target: {
            checked: !checked,
          }
        } as any);
        // props.onChange?.(e);
      }}
    />
  );

  if (groupContext?.type === 'button') {
    return (
      <View className={cls} style={props.style}>
        {inputRender}
        <Label for={id}>
          <View className={bem('click')}>{children}</View>
        </Label>
        <Button
          disabled={disabled}
          theme={checked ? 'primary' : 'default'}
          size="xs"
          block={groupContext?.block}
        >
          {children}
        </Button>
      </View>
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
      <Label for={id} data-role="label">
        <List.Item
          hasArrow={false}
          className={cls}
          style={props.style}
          prefix={groupContext?.iconAlign === 'before' ? tickRender : undefined}
          suffix={groupContext?.iconAlign === 'after' ? tickRender : undefined}
          title={textRender}
        />
      </Label>
    );
  }

  const contentRender =
    typeof props.children === 'function' ? (
      props.children(currentProps)
    ) : (
      <>
        {iconRender}
        {textRender}
      </>
    );

  return (
    <View className={cls} style={props.style}>
      <Label for={id}>
        <View className={bem('label')}> {contentRender}</View>
      </Label>
      {inputRender}
    </View>
  );
};

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  indeterminate: false,
};

export default Checkbox;
