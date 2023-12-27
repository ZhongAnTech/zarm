import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { getRuntimeConfig } from '../config-provider';
import { ModalShowProps } from './methods';
import { getCustomEventsPath, customEvents } from '../utils/dom/dom.mini';

export interface ModalConfirmProps extends Omit<ModalShowProps, 'actions'> {
  confirmText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onConfirm?: () => boolean | void | Promise<boolean | void>;
  onCancel?: () => boolean | void | Promise<boolean | void>;
  id: string;
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
  const path = getCustomEventsPath(props.id);
  return new Promise((resolve) => {
    customEvents.trigger(path, {
      ...rest,
      className: bem([className]),
      animationType,
      visible: true,
      actions: [
        [
          {
            theme: 'default',
            text: cancelText || locale?.Modal.cancelText,
            onClick: async () => {
              const result = onCancel?.();
              if (result === false) return;
              customEvents.trigger(path, { visible: false });
              resolve(false);
            },
          },
          {
            text: confirmText || locale?.Modal.confirmText,
            onClick: async () => {
              const result = await onConfirm?.();
              if (result === false) return;
              customEvents.trigger(path, { visible: false });
              resolve(true);
            },
          },
        ],
      ],
    });
  });
};
