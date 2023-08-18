import { Input, InputProps, Textarea, TextareaProps, View } from '@tarojs/components';
import { createBEM } from '@zarm-design/bem';
import { CloseCircleFill } from '@zarm-design/icons';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { useControllableEventValue } from '../utils/hooks';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseInputTextareaProps, BaseInputTextProps, InputCssVars } from './interface';

const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g;

const countSymbols = (text = '') => {
  return text.replace(regexAstralSymbols, '_').length;
};

export type InputTextProps = BaseInputTextProps & HTMLProps<InputCssVars> & InputProps;

export type InputTextareaProps = BaseInputTextareaProps & TextareaProps & HTMLProps<InputCssVars>;

export type InputBaseProps = {
  type?: string;
  maxLength: number;
  defaultValue: string;
  onChange: (value: string) => void;
  showLength: boolean;
  readOnly: boolean;
} & (InputTextProps | InputTextareaProps);

const InputBase = (props: InputBaseProps) => {
  const {
    type,
    disabled,
    autoFocus,
    clearable,
    showLength,
    readOnly,
    maxLength,
    autoHeight,
    className,
    style,
    maxlength,
    label,
    defaultValue = '',
    onChange,
    onBlur,
    onFocus,
    confirmType,
    ...restProps
  } = props as InputBaseProps;

  const [value, setValue] = useControllableEventValue({
    ...props,
    defaultValue,
    eventKey: 'detail',
  });
  const [focused, setFocused] = React.useState<boolean>(autoFocus!);
  const isTextarea = type === 'text' && 'autoHeight' in props;

  const showClearIcon = clearable && !disabled && typeof value !== 'undefined' && value?.length > 0;

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('input', { prefixCls });

  const cls = bem([
    {
      textarea: isTextarea,
      disabled,
      clearable: showClearIcon,
      focus: focused,
    },
    className,
  ]);

  // 渲染文字长度
  const textLengthRender = showLength && maxLength && (
    <View className={bem('length')}>{`${countSymbols(value)}/${maxLength}`}</View>
  );

  const commonProps: InputTextProps & InputTextareaProps = {
    // ...restProps,
    maxlength: maxLength,
    disabled,
    autoFocus,
    // readOnly,
    value,
    onFocus: (e) => {
      setFocused(true);
      onFocus?.(e);
    },
    onBlur: (e) => {
      setFocused(false);
      onBlur?.(e);
    },
    onInput: (e) => {
      // console.log(e);
      setValue(e as any);
    },
  };

  // 渲染输入框
  const inputRender = isTextarea ? (
    <View className={bem('inner')}>
      <Textarea {...commonProps} autoHeight />
      {textLengthRender}
    </View>
  ) : (
    <Input
      {...commonProps}
      confirmType={confirmType as keyof InputProps.ConfirmType}
      type={type as keyof InputProps.Type}
    />
  );

  // 渲染文本内容
  const textRender = <View className={bem('content')}>{value}</View>;

  // 渲染标签栏
  const labelRender = !!label && <View className={bem('label')}>{label}</View>;

  // 渲染清除按钮
  const clearIconRender = showClearIcon && (
    <CloseCircleFill className={bem('clear')} onClick={() => console.log(1)} />
  );

  return (
    <View className={cls} style={style}>
      {labelRender}
      {!readOnly ? inputRender : textRender}
      {clearIconRender}
    </View>
  );
};

InputBase.displayName = 'Input';

InputBase.defaultProps = {
  type: 'text',
  disabled: false,
  autoFocus: false,
  readOnly: false,
  clearable: false,
  showLength: false,
  autoHeight: false,
};

export default InputBase;
