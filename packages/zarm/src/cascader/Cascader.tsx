import React, { useEffect, useState, useCallback, useContext, forwardRef, createRef } from 'react';
import { createBEM } from '@zarm-design/bem';
import type { HTMLProps } from '../utils/utilityTypes';
import { ConfigContext } from '../n-config-provider';
import Popup from '../popup';
import CascaderView from '../cascader-view';
import { parseState } from '../cascader-view/utils';
import type { BaseCascaderProps } from './Interface';

export type CascaderProps = BaseCascaderProps & HTMLProps;

export type CascaderState = ReturnType<typeof parseState> & {
  visible?: boolean;
};

const Cascader = forwardRef<unknown, CascaderProps>((props, ref) => {
  const {
    className,
    title,
    visible,
    mountContainer,
    maskClosable,
    okText,
    cancelText,
    onOk,
    onCancel,
    onChange,
    ...restProps
  } = props;
  const cascaderRef = (ref as any) || createRef<HTMLDivElement>();
  const [state, setState] = useState<CascaderState>({ ...parseState(props), visible });
  const { prefixCls, locale: globalLocal } = useContext(ConfigContext);
  const locale = globalLocal?.Cascader;
  const bem = createBEM('cascader', { prefixCls });
  const cls = bem([className]);

  useEffect(() => {
    setState({
      ...parseState(props),
      visible: props.visible,
    });
  }, [props.visible]);

  /**
   * 点击遮罩
   */
  const handleMaskClick = () => {
    if (!maskClosable) return;

    if (onCancel) {
      if (typeof onCancel !== 'function') {
        console.error('onCancel need a function');
      } else {
        onCancel();
      }
    }

    setState({
      ...state,
      visible: !visible,
    });
  };

  /**
   * 点击取消按钮
   */
  const handleCancel = () => {
    if (onCancel) {
      if (typeof onCancel !== 'function') {
        console.error('onCancel need a function');
      } else {
        onCancel();
      }
    }
  };

  /**
   * 修改列表值
   * @param itemValue
   * @param index
   */
  const onValueChange = useCallback(
    (newValue) => {
      setState((prevState) => ({
        ...prevState,
        value: newValue,
      }));
      if (onChange) {
        if (typeof onChange !== 'function') {
          console.error('onChange need a function');
        } else {
          onChange(newValue);
        }
      }
    },
    [onChange],
  );

  /**
   * 点击确认按钮
   */
  const handleOk = () => {
    if (onOk) {
      if (typeof onOk !== 'function') {
        console.error('onOk need a function');
      } else {
        onOk(state.value as string[]);
      }
    }
  };

  return (
    <Popup
      ref={cascaderRef}
      direction="bottom"
      mountContainer={mountContainer}
      visible={state.visible}
      onMaskClick={handleMaskClick}
    >
      <div className={cls}>
        <div className={bem('header')}>
          <div className={bem('cancel')} onClick={handleCancel}>
            {cancelText || locale!.cancelText}
          </div>
          <div className={bem('title')}>{title || locale!.title}</div>
          <div className={bem('submit')} onClick={handleOk}>
            {okText || locale!.okText}
          </div>
        </div>
        <div className={bem('body')}>
          <CascaderView className={className} {...restProps} onChange={onValueChange} />
        </div>
      </div>
    </Popup>
  );
});

Cascader.displayName = 'Cascader';

Cascader.defaultProps = {
  visible: false,
  maskClosable: false,
};

export default Cascader;
