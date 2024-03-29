import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { getRuntimeConfig } from '../config-provider';
import { ModalShowProps, show } from './methods';

export interface ModalConfirmProps extends Omit<ModalShowProps, 'actions'> {
  confirmText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onConfirm?: () => boolean | void | Promise<boolean | void>;
  onCancel?: () => boolean | void | Promise<boolean | void>;
}

export const confirm = (props: ModalConfirmProps): Promise<boolean> => {
  const {
    className,
    animationType = 'zoom',
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    ...rest
  } = props;
  const { prefixCls, locale } = getRuntimeConfig();
  const bem = createBEM('confirm', { prefixCls });
  return new Promise((resolve) => {
    const { close } = show({
      ...rest,
      className: bem([className]),
      animationType,
      actions: [
        [
          {
            theme: 'default',
            text: cancelText || locale?.Modal.cancelText,
            onClick: async () => {
              const result = onCancel?.();
              if (result === false) return;
              close();
              resolve(false);
            },
          },
          {
            text: confirmText || locale?.Modal.confirmText,
            onClick: async () => {
              const result = await onConfirm?.();
              if (result === false) return;
              close();
              resolve(true);
            },
          },
        ],
      ],
    });
  });
};
