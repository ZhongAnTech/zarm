import React, { useState, useCallback, useContext, forwardRef, createRef } from 'react';
import { createBEM } from '@zarm-design/bem';
import type { HTMLProps } from '../utils/utilityTypes';
import { ConfigContext } from '../config-provider';
import PickerContainer from '../picker/Container';
import CascaderView from '../cascader-view';
import { parseState } from '../cascader-view/utils';
import type { BaseCascaderProps } from './interface';

export type CascaderProps = BaseCascaderProps & HTMLProps;

export type CascaderState = ReturnType<typeof parseState>;

const Cascader = forwardRef<HTMLDivElement, CascaderProps>((props, ref) => {
  const {
    className,
    title,
    visible,
    value,
    defaultValue,
    fieldNames,
    dataSource,
    cols,
    itemRender,
    mountContainer,
    maskClosable,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    onChange,
  } = props;
  const cascaderRef = ref || createRef<HTMLDivElement>();
  const cascaderViewRef = createRef<HTMLDivElement>();
  const [state, setState] = useState<CascaderState>({ ...parseState(props) });
  const { prefixCls, locale } = useContext(ConfigContext);

  const bem = createBEM('cascader', { prefixCls });

  const handleConfirm = () => {
    onConfirm?.(state.value);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const onValueChange = useCallback(
    (newValue) => {
      setState((prevState) => ({
        ...prevState,
        value: newValue,
      }));
      onChange?.(newValue);
    },
    [onChange],
  );

  return (
    <PickerContainer
      ref={cascaderRef}
      className={bem([className])}
      title={title || locale?.Cascader.title}
      confirmText={confirmText || locale?.Cascader.confirmText}
      cancelText={cancelText || locale?.Cascader.cancelText}
      visible={visible}
      maskClosable={maskClosable}
      mountContainer={mountContainer}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onClose={handleCancel}
    >
      <CascaderView
        ref={cascaderViewRef}
        className={className}
        value={value}
        defaultValue={defaultValue}
        fieldNames={fieldNames}
        dataSource={dataSource}
        cols={cols}
        itemRender={itemRender}
        onChange={onValueChange}
      />
    </PickerContainer>
  );
});

Cascader.displayName = 'Cascader';

Cascader.defaultProps = {
  maskClosable: true,
};

export default Cascader;
