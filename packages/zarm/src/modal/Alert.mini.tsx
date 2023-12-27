import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { getCustomEventsPath, customEvents } from '../utils/dom/dom.mini';
import { getRuntimeConfig } from '../config-provider';
import { ModalShowProps } from './methods';

export interface ModalAlertProps extends Omit<ModalShowProps, 'actions'> {
  confirmText?: React.ReactNode;
  onConfirm?: () => boolean | void | Promise<boolean | void>;
  id: string;
}

export const alert = (props: ModalAlertProps) => {
  const { className, animationType = 'zoom', confirmText, onConfirm, ...rest } = props;
  const { prefixCls, locale } = getRuntimeConfig();
  const bem = createBEM('alert', { prefixCls });
  const path = getCustomEventsPath(props.id);
  return new Promise((resolve) => {
    customEvents.trigger(path, {
      ...rest,
      className: bem([className]),
      animationType,
      visible: true,
      actions: [
        {
          text: confirmText || locale?.Modal.confirmText,
          onClick: async () => {
            const result = await props.onConfirm?.();
            if (result === false) return;
            customEvents.trigger(path, { visible: false });
            resolve(null);
          },
        },
      ],
    });
  });
};

export default alert;
