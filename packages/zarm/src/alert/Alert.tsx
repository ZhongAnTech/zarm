import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import Modal from '../modal';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseAlertProps } from './interface';

export type AlertProps = BaseAlertProps & HTMLProps;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { className, content, confirmText, onConfirm, ...rest } = props;
  const { prefixCls, locale } = React.useContext(ConfigContext);
  const bem = createBEM('alert', { prefixCls });
  const cls = bem([className]);

  return (
    <Modal
      {...rest}
      ref={ref}
      className={cls}
      actions={[
        {
          text: confirmText || locale?.Confirm.confirmText,
          onClick: onConfirm,
          bold: true,
        },
      ]}
    >
      {content}
    </Modal>
  );
});

Alert.displayName = 'Alert';

Alert.defaultProps = {
  animationType: 'zoom',
  shape: 'radius',
};

export default Alert;
