import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { getRuntimeConfig } from '../config-provider';
import { ModalShowProps, show } from './methods';
import { getInstance } from '../utils/dom/dom.mini';

export interface ModalAlertProps extends Omit<ModalShowProps, 'actions'> {
  confirmText?: React.ReactNode;
  onConfirm?: () => boolean | void | Promise<boolean | void>;
}

export const alert = (props: ModalAlertProps) => {
  const { className, animationType = 'zoom', confirmText, onConfirm, ...rest } = props;
  const { prefixCls, locale } = getRuntimeConfig();
  const bem = createBEM('alert', { prefixCls });
  return new Promise((resolve) => {
    const { close } = show({
      ...rest,
      className: bem([className]),
      animationType,
      actions: [
        {
          text: confirmText || locale?.Modal.confirmText,
          onClick: async () => {
            const result = await props.onConfirm?.();
            if (result === false) return;
            close();
            resolve(null);
          },
        },
      ],
    });
  });
};

export default alert;
