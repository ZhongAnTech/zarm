import { createBEM } from '@zarm-design/bem';
import React, { createRef, forwardRef, useCallback, useContext, useState } from 'react';
import type { PickerContainerCssVars } from '../picker/Container';
import CascaderView from '../cascader-view';
import { parseItems, parseState } from '../cascader-view/utils';
import { ConfigContext } from '../config-provider';
import PickerContainer from '../picker/Container';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseCascaderProps } from './interface';

export type CascaderProps = BaseCascaderProps & HTMLProps<PickerContainerCssVars>;

export type CascaderState = ReturnType<typeof parseState>;

const Cascader = forwardRef<HTMLDivElement, CascaderProps>((props, ref) => {
  const {
    className,
    style,
    title,
    visible,
    value,
    defaultValue,
    fieldNames,
    dataSource,
    cols,
    itemRender,
    mountContainer,
    safeArea,
    maskClosable,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    onChange,
    afterOpen,
    afterClose,
  } = props;
  const cascaderViewRef = createRef<HTMLDivElement>();
  const [state, setState] = useState<CascaderState>({ ...parseState(props) });
  const { prefixCls, locale } = useContext(ConfigContext);

  const bem = createBEM('cascader', { prefixCls });

  const handleConfirm = () => {
    const items = parseItems(dataSource, state.value, fieldNames);
    onConfirm?.(state.value, items);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const onValueChange = useCallback(
    (newValue, items) => {
      setState((prevState) => ({
        ...prevState,
        value: newValue,
      }));
      onChange?.(newValue, items);
    },
    [onChange],
  );

  return (
    <PickerContainer
      ref={ref}
      className={bem([className])}
      style={style}
      title={title || locale?.Cascader.title}
      confirmText={confirmText || locale?.Cascader.confirmText}
      cancelText={cancelText || locale?.Cascader.cancelText}
      visible={visible}
      maskClosable={maskClosable}
      mountContainer={mountContainer}
      safeArea={safeArea}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onClose={handleCancel}
      afterOpen={afterOpen}
      afterClose={afterClose}
    >
      <CascaderView
        ref={cascaderViewRef}
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
