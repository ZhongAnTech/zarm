import { Input, InputProps, Textarea, TextareaProps, View } from '@tarojs/components';
import { createBEM } from '@zarm-design/bem';
import { CloseCircleFill } from '@zarm-design/icons';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { useControllableEventValue } from '../utils/hooks';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseInputTextareaProps, BaseInputTextProps, InputCssVars } from './interface';
import { countSymbols } from './utils';

export type { InputCssVars } from './interface';

interface ExtraProps {
  type?: string;
  maxLength: number;
  defaultValue: string;
  onChange: (value: string) => void;
  showLength: boolean;
  readOnly: boolean;
}

interface InputType {
  type: InputProps.Type | 'textarea';
}

export type InputTextProps = BaseInputTextProps &
  HTMLProps<InputCssVars> &
  Omit<InputProps, 'Type'> &
  ExtraProps &
  InputType;

export type InputTextareaProps = BaseInputTextareaProps &
  TextareaProps &
  HTMLProps<InputCssVars> &
  ExtraProps;

export type InputBaseProps = InputTextProps | InputTextareaProps;

const InputBase = (props: InputBaseProps) => {
  const {
    type,
    disabled,
    autoFocus,
    clearable,
    showLength,
    readOnly,
    maxLength,
    className,
    style,
    label,
    onBlur,
    onFocus,
    confirmType,
    placeholder,
    placeholderStyle,
    cursorSpacing,
    cursor,
    selectionStart,
    selectionEnd,
    adjustPosition,
    holdKeyboard,
    onConfirm,
    onKeyboardHeightChange,
  } = props;

  const [value, setValue] = useControllableEventValue({
    ...props,
    eventKey: 'detail',
  });
  const [focused, setFocused] = React.useState<boolean>(autoFocus!);
  const isTextarea = type === 'textarea';

  const showClearIcon = clearable && !disabled && typeof value !== 'undefined' && value?.length > 0;

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('input', { prefixCls });

  const cls = bem([
    {
      textarea: isTextarea,
      disabled,
      clearable: showClearIcon,
      focus: focused,
      autoHeight: 'autoHeight' in props && props.autoHeight,
    },
    className,
  ]);

  // 渲染文字长度
  const textLengthRender = showLength && maxLength && (
    <View className={bem('length')}>{`${countSymbols(value)}/${maxLength}`}</View>
  );

  const commonProps = {
    maxlength: maxLength,
    disabled,
    autoFocus,
    placeholder,
    placeholderStyle,
    cursorSpacing,
    cursor,
    selectionStart,
    selectionEnd,
    adjustPosition,
    onConfirm,
    onKeyboardHeightChange,
    holdKeyboard,
    value,
    onFocus: (e) => {
      setFocused(true);
      onFocus?.(e);
    },
    onBlur: (e) => {
      onBlur?.(e);
      setTimeout(() => {
        setFocused(false);
      }, 50);
    },
    onInput: (e) => {
      setValue(e as any);
    },
  };

  // 渲染输入框
  const inputRender = isTextarea ? (
    <View className={bem('inner')}>
      <Textarea
        nativeProps={{
          className: bem('textarea', [className]),
          style,
        }}
        {...commonProps}
        autoHeight={(props as TextareaProps).autoHeight}
        showConfirmBar={(props as TextareaProps).showConfirmBar}
        disableDefaultPadding={(props as TextareaProps).disableDefaultPadding}
        confirmType={(props as TextareaProps).confirmType}
        confirmHold={(props as TextareaProps).confirmHold}
        adjustKeyboardTo={(props as TextareaProps).adjustKeyboardTo}
        onLineChange={(props as TextareaProps).onLineChange}
      />
      {textLengthRender}
    </View>
  ) : (
    <Input
      {...commonProps}
      confirmType={confirmType as keyof InputProps.ConfirmType}
      type={(type === 'password' ? 'text' : type) as keyof InputProps.Type}
      password={type === 'password'}
      alwaysEmbed={(props as InputProps).alwaysEmbed}
      confirmHold={(props as InputProps).confirmHold}
      safePasswordCertPath={(props as InputProps).safePasswordCertPath}
      safePasswordLength={(props as InputProps).safePasswordLength}
      safePasswordTimeStamp={(props as InputProps).safePasswordTimeStamp}
      safePasswordNonce={(props as InputProps).safePasswordNonce}
      safePasswordSalt={(props as InputProps).safePasswordSalt}
      safePasswordCustomHash={(props as InputProps).safePasswordCustomHash}
      onNickNameReview={(props as InputProps).onNickNameReview}
    />
  );

  // 渲染文本内容
  const textRender = <View className={bem('content', [className])}>{value}</View>;

  // 渲染标签栏
  const labelRender = !!label && <View className={bem('label')}>{label}</View>;

  // 渲染清除按钮
  const clearIconRender = showClearIcon && (
    <CloseCircleFill
      className={bem('clear')}
      onClick={(e) => {
        e.stopPropagation();
        setTimeout(() => {
          setValue({
            detail: {
              value: '',
            },
          } as any);
        }, 100);
      }}
    />
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
};

export default InputBase;
