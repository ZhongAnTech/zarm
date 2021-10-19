import React, { useEffect, useContext, useState } from 'react';
import classnames from 'classnames';

import { ConfigContext } from '../n-config-provider';
import Popup from '../popup';
import PickerView from '../picker-view';
import parseProps from '../picker-view/utils/parseProps';
import type { BasePickerProps } from './interface';

export type PickerProps = BasePickerProps & React.HTMLAttributes<HTMLDivElement>;

const Picker: React.FC<PickerProps> = (props) => {
  const {
    className,
    cancelText,
    okText,
    title,
    maskClosable,
    mountContainer,
    destroy,
    onOk,
    onCancel,
    visible,
    valueMember,
    onChange,
    itemRender,
    dataSource,
  } = props;
  const [state, setState] = useState(parseProps.getSource(props));

  const { prefixCls: globalPrefixCls, locale } = useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-picker`;
  const cls = classnames(prefixCls, className);

  const onClickCancel = () => {
    const { value = [], objValue = [] } = state.value;

    setState((preState) => ({
      ...preState,
      value,
      objValue,
    }));

    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  const onClickOk = () => {
    if (typeof onOk === 'function') {
      onOk(state.objValue);
    }
  };

  const onPickViewChange = (selected) => {
    const value = selected.map((item) => item[valueMember!]);
    setState((prevState) => ({ ...prevState, value, objValue: selected }));

    if (typeof onChange === 'function') {
      onChange(selected);
    }
  };

  useEffect(() => {
    setState(parseProps.getSource(props));
  }, [dataSource]);

  return (
    <Popup
      visible={visible}
      onMaskClick={maskClosable ? onClickCancel : () => {}}
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
          <div className={`${prefixCls}__cancel`} onClick={onClickCancel}>
            {cancelText || locale?.Picker?.cancelText}
          </div>
          <div className={`${prefixCls}__title`}>{title || locale?.Picker?.title}</div>
          <div className={`${prefixCls}__submit`} onClick={onClickOk}>
            {okText || locale?.Picker?.okText}
          </div>
        </div>
        <PickerView
          dataSource={state.dataSource}
          value={state.value}
          itemRender={itemRender}
          onChange={onPickViewChange}
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
