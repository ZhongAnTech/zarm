import { createBEM } from '@zarm-design/bem';
import { Close as CloseIcon } from '@zarm-design/icons';
import * as React from 'react';
import { useSetState } from 'ahooks';
import { View } from '@tarojs/components';
import { ConfigContext } from '../config-provider';
import Popup from '../popup';
import { noop } from '../utils';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseModalProps, ModalCssVars } from './interface';
import type { ModalActionProps } from './ModalAction.mini';
import ModalAction from './ModalAction.mini';

import { useCustomEvent } from '../utils/dom/dom.mini';

export interface ModalProps extends BaseModalProps, HTMLProps<ModalCssVars> {
  actions?: (ModalActionProps | ModalActionProps[])[];
  onAction?: (action: ModalActionProps) => void | Promise<void>;
  id: string;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const [state, setState] = useSetState(props);

  const {
    id,
    className,
    title,
    shape,
    closable,
    onClose,
    children,
    footer,
    maskClosable,
    actions,
    onAction,
    ...rest
  } = state;

  useCustomEvent(id, (prarms) => {
    setState(prarms);
  });

  React.useEffect(()=> {
    setState({
      ...state,
      visible: props.visible,
    });
  }, [props.visible])

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('modal', { prefixCls });

  const cls = bem([
    {
      [`${shape}`]: !!shape,
    },
    className,
  ]);

  const showHeader = title || closable;
  const hasActions = actions && actions!.length > 0;
  const showFooter = !!footer || hasActions;

  const actionsRender = actions!.map((action, i) => {
    const currentAction = Array.isArray(action) ? action : [action];

    return (
      <View key={+i} className={bem('action')}>
        {currentAction.map((child, j) => (
          <ModalAction
            {...child}
            key={+j}
            onClick={async () => {
              await child.onClick?.();
              await onAction?.(child);
            }}
          />
        ))}
      </View>
    );
  });

  return (
    <Popup
      {...rest}
      ref={ref}
      className={cls}
      direction="center"
      onMaskClick={maskClosable ? onClose : noop}
    >
      <View
        className={bem('dialog')}
        onClick={(event) => {
          event.stopPropagation();
        }}>
        <View className={bem('body')}>
          {showHeader && (
            <>
              <View className={bem('title')}>{title}</View>
              {closable && <CloseIcon size="sm" className={bem('close')} onClick={onClose} />}
            </>
          )}
          {children}
        </View>
        {showFooter && <View className={bem('footer')}>{hasActions ? actionsRender : footer}</View>}
      </View>
    </Popup>
  );
});

Modal.defaultProps = {
  visible: false,
  animationType: 'fade',
  width: '70%',
  mask: true,
  shape: 'radius',
  closable: false,
  maskClosable: false,
  destroy: true,
  actions: [],
};

export default Modal;
