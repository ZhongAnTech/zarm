import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import isEqual from 'lodash/isEqual';
import Popup from '../popup';
import PickerView from '../picker-view';
import parseProps from '../picker-view/utils/parseProps';
import removeFnFromProps from '../picker-view/utils/removeFnFromProps';
import type { BasePickerProps } from './interface';
import { ConfigContext } from '../n-config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import { noop } from '../utils';

export type PickerProps = BasePickerProps &
  HTMLProps<{
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
  }>;

const EVENTS = ['onOk', 'onCancel', 'onChange'];

const Picker = React.forwardRef<HTMLDivElement, PickerProps>((props, ref) => {
  const {
    className,
    cancelText,
    okText,
    title,
    valueMember,
    maskClosable,
    mountContainer,
    forceRender,
    destroy,
    onOk,
    onCancel,
    onChange,
    visible,
    ...rest
  } = props;
  const { prefixCls, locale } = React.useContext(ConfigContext);
  const bem = createBEM('picker', { prefixCls });
  const [state, setState] = React.useState({
    ...parseProps.getSource(props),
    props,
    stopScroll: false,
    tempValue: null,
    tempObjValue: null,
  });

  if (!isEqual(removeFnFromProps(props, EVENTS), removeFnFromProps(state.props, EVENTS))) {
    const next = parseProps.getSource(props);
    setState({
      ...state,
      ...next,
      tempValue: next.value,
      props,
      tempObjValue: next.objValue,
    });
  }

  const handleOk = () => {
    setState({ ...state, stopScroll: true });
    onOk?.(state.objValue);
    setState({ ...state, stopScroll: false });
  };

  const handleCancel = () => {
    const { tempValue = [], tempObjValue = [] } = state;
    setState({
      ...state,
      value: tempValue,
      objValue: tempObjValue,
    });
    onCancel?.();
  };

  const handleChange = (selected) => {
    const value = selected?.map((item) => item[valueMember!]);
    setState({ ...state, value, objValue: selected });
    onChange?.(selected);
  };

  return (
    <Popup
      ref={ref}
      className={className}
      visible={visible}
      onMaskClick={maskClosable ? handleCancel : noop}
      mountContainer={mountContainer}
      forceRender={forceRender}
      destroy={destroy}
    >
      <div
        className={bem('')}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={bem('header')}>
          <div className={bem('cancel')} onClick={handleCancel}>
            {cancelText || locale?.Picker.cancelText}
          </div>
          <div className={bem('title')}>{title || locale?.Picker.title}</div>
          <div className={bem('submit')} onClick={handleOk}>
            {okText || locale?.Picker.okText}
          </div>
        </div>
        <PickerView
          {...rest}
          value={state.value}
          onChange={handleChange}
          stopScroll={state.stopScroll}
        />
      </div>
    </Popup>
  );
});

Picker.defaultProps = {
  dataSource: [],
  valueMember: 'value',
  cols: Infinity,
  maskClosable: true,
  itemRender: (data) => data.label,
  destroy: false,
};

export default Picker;
