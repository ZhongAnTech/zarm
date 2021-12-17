import React, { useContext, HTMLAttributes, FC } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import Popup from '../popup';
import PickerView from '../picker-view';
import usePicker from './usePicker';
import type { BasePickerProps } from './interface';

let isScrollStatus = false;

export type PickerProps = BasePickerProps & HTMLAttributes<HTMLElement>;

const Picker: FC<PickerProps> = (props) => {
  const {
    className,
    dataSource,
    cancelText,
    okText,
    title,
    maskClosable,
    mountContainer,
    destroy,
    visible,
    ...rest
  } = props;

  const { prefixCls: globalPrefixCls, locale: globalLocal } = useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-picker`;
  const locale = globalLocal?.Picker;
  const cls = classnames(prefixCls, className);

  const [state, { onPickerCancel, onPickerOk, onPickViewChange }] = usePicker(props);

  const onMaskClick = () => {
    if (!maskClosable) {
      return;
    }

    if (isScrollStatus) {
      return;
    }

    onPickerCancel();
  };

  return (
    <Popup
      visible={visible}
      onMaskClick={onMaskClick}
      mountContainer={mountContainer}
      destroy={destroy}
    >
      <div
        className={cls}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={`${prefixCls}__header`}>
          <div className={`${prefixCls}__cancel`} onClick={onPickerCancel}>
            {cancelText || locale?.cancelText}
          </div>
          <div className={`${prefixCls}__title`}>{title || locale?.title}</div>
          <div className={`${prefixCls}__submit`} onClick={onPickerOk}>
            {okText || locale?.okText}
          </div>
        </div>
        <PickerView
          {...rest}
          dataSource={dataSource}
          value={state.value}
          onChange={onPickViewChange}
          onScrollStart={() => {
            isScrollStatus = true;
          }}
          onScrollEnd={() => {
            isScrollStatus = false;
          }}
        />
      </div>
    </Popup>
  );
};

Picker.defaultProps = {
  dataSource: [],
  valueMember: 'value',
  cols: Infinity,
  maskClosable: true,
  itemRender: (data) => data.label,
  destroy: false,
};

export default Picker;
