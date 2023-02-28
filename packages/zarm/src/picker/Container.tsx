import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Popup from '../popup';
import SafeArea from '../safe-area';
import { noop } from '../utils';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BasePickerContainerProps } from './interface';

export type PickerContainerProps = BasePickerContainerProps & HTMLProps;

const PickerContainer = React.forwardRef<HTMLDivElement, PickerContainerProps>((props, ref) => {
  const {
    className,
    style,
    visible,
    title,
    confirmText,
    cancelText,
    maskClosable,
    forceRender,
    destroy,
    safeArea,
    mountContainer,
    onConfirm,
    onCancel,
    onClose,
    afterOpen,
    afterClose,
    children,
  } = props;
  const { prefixCls, locale, safeArea: globalSafeArea } = React.useContext(ConfigContext);
  const bem = createBEM('picker', { prefixCls });

  return (
    <Popup
      ref={ref}
      visible={visible}
      onMaskClick={maskClosable ? onClose : noop}
      mountContainer={mountContainer}
      forceRender={forceRender}
      destroy={destroy}
      afterOpen={afterOpen}
      afterClose={afterClose}
    >
      <div
        className={bem('', [className])}
        style={style}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={bem('header')}>
          <div className={bem('cancel')} onClick={() => onCancel?.()}>
            {cancelText || locale?.Picker.cancelText}
          </div>
          <div className={bem('title')}>{title || locale?.Picker.title}</div>
          <div className={bem('confirm')} onClick={() => onConfirm?.()}>
            {confirmText || locale?.Picker.confirmText}
          </div>
        </div>
        <div className={bem('body')}>{children}</div>
        {(safeArea ?? globalSafeArea) && <SafeArea position="bottom" />}
      </div>
    </Popup>
  );
});

export default PickerContainer;
