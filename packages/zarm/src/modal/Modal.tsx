import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { Close as CloseIcon } from '@zarm-design/icons';
import { ConfigContext } from '../n-config-provider';
import Popup from '../popup';
import ModalAction from './ModalAction';
import { noop } from '../utils';
import type { BaseModalProps } from './interface';
import type { ModalActionProps } from './ModalAction';
import type { HTMLProps } from '../utils/utilityTypes';

export interface ModalCssVars {
  '--za-modal-background'?: React.CSSProperties['background'];
  '--za-modal-border-radius'?: React.CSSProperties['borderRadius'];
  '--za-modal-box-shadow'?: React.CSSProperties['boxShadow'];
  '--za-modal-title-font-size'?: React.CSSProperties['fontSize'];
  '--za-modal-title-font-weight'?: React.CSSProperties['fontWeight'];
  '--za-modal-title-text-color'?: React.CSSProperties['color'];
  '--za-modal-close-size'?: React.CSSProperties['fontSize'];
  '--za-modal-close-color'?: React.CSSProperties['color'];
  '--za-modal-close-active-color'?: React.CSSProperties['color'];
  '--za-modal-body-font-size'?: React.CSSProperties['fontSize'];
  '--za-modal-body-text-color'?: React.CSSProperties['color'];
  '--za-modal-body-padding'?: React.CSSProperties['padding'];
  '--za-modal-button-height'?: React.CSSProperties['height'];
  '--za-modal-button-font-size'?: React.CSSProperties['fontSize'];
  '--za-modal-button-font-weight'?: React.CSSProperties['fontWeight'];
  '--za-modal-button-text-color'?: React.CSSProperties['color'];
}

export type ModalProps = BaseModalProps &
  HTMLProps & {
    actions?: (ModalActionProps | ModalActionProps[])[];
    onAction?: (action: ModalActionProps) => void | Promise<void>;
  };

const Modal = React.forwardRef<typeof Popup, ModalProps>((props, ref) => {
  const {
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
  } = props;

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
      <div key={+i} className={bem('action')}>
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
      </div>
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
      <div className={bem('dialog')}>
        <div className={bem('body')}>
          {showHeader && (
            <>
              <div className={bem('title')}>{title}</div>
              {closable && <CloseIcon size="sm" className={bem('close')} onClick={onClose} />}
            </>
          )}
          {children}
        </div>
        {showFooter && <div className={bem('footer')}>{hasActions ? actionsRender : footer}</div>}
      </div>
    </Popup>
  );
});

Modal.defaultProps = {
  visible: false,
  animationType: 'fade',
  animationDuration: 200,
  width: '70%',
  mask: true,
  maskType: 'normal',
  shape: 'radius',
  closable: false,
  maskClosable: false,
  destroy: true,
  actions: [],
};

export default Modal;
