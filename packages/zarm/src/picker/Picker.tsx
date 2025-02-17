import * as React from 'react';
import PickerView, { PickerColumnItem, PickerValue, PickerViewInstance } from '../picker-view';
import type { HTMLProps } from '../utils/utilityTypes';
import PickerContainer, { PickerContainerCssVars } from './Container';
import type { BasePickerProps } from './interface';

export interface PickerCssVars extends PickerContainerCssVars {
  '--cotnent-background': React.CSSProperties['background'];
  '--cotnent-padding': React.CSSProperties['padding'];
  '--cotnent-mask-start-background': React.CSSProperties['background'];
  '--cotnent-mask-end-background': React.CSSProperties['background'];
  '--wheel-item-rows': number;
  '--wheel-item-height': React.CSSProperties['height'];
  '--wheel-item-font-size': React.CSSProperties['fontSize'];
  '--wheel-item-text-color': React.CSSProperties['color'];
  '--wheel-item-disabled-text-color': React.CSSProperties['color'];
  '--wheel-item-selected-background': React.CSSProperties['background'];
  '--wheel-item-selected-border-radius': React.CSSProperties['borderRadius'];
}

export type PickerProps = BasePickerProps & HTMLProps<PickerCssVars>;

const Picker: React.FC<PickerProps> = (props) => {
  const {
    className,
    style,
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
      style={style}
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
