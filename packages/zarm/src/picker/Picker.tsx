import * as React from 'react';
import PickerView, { PickerViewInstance } from '../picker-view';
import type { BasePickerProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';
import PickerContainer from './Container';

export interface PickerCssVars {
  '--header-height': React.CSSProperties['height'];
  '--header-font-size': React.CSSProperties['fontSize'];
  '--header-background-color': React.CSSProperties['backgroundColor'];
  '--header-title-text-color': React.CSSProperties['color'];
  '--header-submit-text-color': React.CSSProperties['color'];
  '--header-cancel-text-color': React.CSSProperties['color'];
  '--cotnent-background-color': React.CSSProperties['backgroundColor'];
  '--cotnent-padding': React.CSSProperties['padding'];
  '--cotnent-mask-start-background-color': React.CSSProperties['backgroundColor'];
  '--cotnent-mask-end-background-color': React.CSSProperties['backgroundColor'];
  '--wheel-item-rows': number;
  '--wheel-item-height': React.CSSProperties['height'];
  '--wheel-item-font-size': React.CSSProperties['fontSize'];
  '--wheel-item-text-color': React.CSSProperties['color'];
  '--wheel-item-disabled-text-color': React.CSSProperties['color'];
  '--wheel-item-selected-background-color': React.CSSProperties['backgroundColor'];
  '--wheel-item-selected-border-radius': React.CSSProperties['borderRadius'];
}

export type PickerProps = BasePickerProps & HTMLProps<PickerCssVars>;

const Picker = React.forwardRef<HTMLDivElement, PickerProps>((props, ref) => {
  const {
    className,
    title,
    confirmText,
    cancelText,
    value,
    defaultValue,
    wheelDefaultValue,
    dataSource,
    fieldNames,
    itemRender,
    cols,
    maskClosable,
    mountContainer,
    forceRender,
    destroy,
    onChange,
    onConfirm,
    onCancel,
    visible,
  } = props;
  const pickerViewRef = React.useRef<PickerViewInstance>(null);

  const handleConfirm = () => {
    onConfirm?.(pickerViewRef.current?.value!, pickerViewRef.current?.items!);
  };

  const handleCancel = () => {
    pickerViewRef.current?.reset();
    onCancel?.();
  };

  return (
    <PickerContainer
      ref={ref}
      title={title}
      className={className}
      confirmText={confirmText}
      cancelText={cancelText}
      visible={visible}
      maskClosable={maskClosable}
      forceRender={forceRender}
      destroy={destroy}
      mountContainer={mountContainer}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onClose={handleCancel}
    >
      <PickerView
        ref={pickerViewRef}
        value={value}
        defaultValue={defaultValue}
        wheelDefaultValue={wheelDefaultValue}
        dataSource={dataSource}
        cols={cols}
        fieldNames={fieldNames}
        itemRender={itemRender}
        onChange={onChange}
      />
    </PickerContainer>
  );
});

Picker.defaultProps = {
  dataSource: [],
  cols: Infinity,
  maskClosable: true,
  destroy: false,
};

export default Picker;
