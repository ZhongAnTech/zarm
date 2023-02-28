import * as React from 'react';
import PickerView, { PickerColumnItem, PickerValue, PickerViewInstance } from '../picker-view';
import type { HTMLProps } from '../utils/utilityTypes';
import PickerContainer from './Container';
import type { BasePickerProps } from './interface';

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

const Picker: React.FC<PickerProps> = (props) => {
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
    safeArea,
    onChange,
    onConfirm,
    onCancel,
    visible,
  } = props;

  const pickerViewRef = React.useRef<PickerViewInstance>(null);

  const handleChange = (changedValue: PickerValue[], items: PickerColumnItem[], index: number) => {
    visible && onChange?.(changedValue, items, index);
  };

  const handleConfirm = () => {
    onConfirm?.(pickerViewRef.current?.value!, pickerViewRef.current?.items!);
  };

  const handleCancel = () => {
    pickerViewRef.current?.reset?.();
    onCancel?.();
  };

  return (
    <PickerContainer
      title={title}
      className={className}
      confirmText={confirmText}
      cancelText={cancelText}
      visible={visible}
      maskClosable={maskClosable}
      forceRender={forceRender}
      destroy={destroy}
      safeArea={safeArea}
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
        onChange={handleChange}
      />
    </PickerContainer>
  );
};

Picker.defaultProps = {
  dataSource: [],
  cols: Infinity,
  maskClosable: true,
  destroy: false,
};

export default Picker;
