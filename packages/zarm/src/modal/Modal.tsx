import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { Close as CloseIcon } from '@zarm-design/icons';
import { ConfigContext } from '../config-provider';
import Popup from '../popup';
import ModalAction from './ModalAction';
import { noop } from '../utils';
import type { BaseModalProps } from './interface';
import type { ModalActionProps } from './ModalAction';
import type { HTMLProps } from '../utils/utilityTypes';

export interface ModalCssVars {
  '--background'?: React.CSSProperties['background'];
  '--border-radius'?: React.CSSProperties['borderRadius'];
  '--shadow'?: React.CSSProperties['boxShadow'];
  '--title-font-size'?: React.CSSProperties['fontSize'];
  '--title-font-weight'?: React.CSSProperties['fontWeight'];
  '--title-text-color'?: React.CSSProperties['color'];
  '--close-size'?: React.CSSProperties['fontSize'];
  '--close-color'?: React.CSSProperties['color'];
  '--close-active-color'?: React.CSSProperties['color'];
  '--body-font-size'?: React.CSSProperties['fontSize'];
  '--body-text-color'?: React.CSSProperties['color'];
  '--body-padding'?: React.CSSProperties['padding'];
  '--button-height'?: React.CSSProperties['height'];
  '--button-font-size'?: React.CSSProperties['fontSize'];
  '--button-font-weight'?: React.CSSProperties['fontWeight'];
  '--button-text-color'?: React.CSSProperties['color'];
  '--button-background'?: React.CSSProperties['background'];
  '--button-active-background'?: React.CSSProperties['background'];
  '--button-disabled-opacity'?: React.CSSProperties['opacity'];
}

export interface ModalProps extends BaseModalProps, HTMLProps<ModalCssVars> {
  actions?: (ModalActionProps | ModalActionProps[])[];
  onAction?: (action: ModalActionProps) => void | Promise<void>;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
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
  animationType: 'zoom',
  width: '70%',
  mask: true,
  shape: 'radius',
  closable: false,
  maskClosable: false,
  destroy: true,
  actions: [],
};

export default Modal;
