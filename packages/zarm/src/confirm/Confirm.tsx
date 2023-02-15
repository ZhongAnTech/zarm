import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Modal from '../modal';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseConfirmProps } from './interface';

export type ConfirmProps = BaseConfirmProps & HTMLProps;

const Confirm = React.forwardRef<HTMLDivElement, ConfirmProps>((props, ref) => {
  const { className, content, confirmText, cancelText, onConfirm, onCancel, ...rest } = props;
  const { prefixCls, locale } = React.useContext(ConfigContext);
  const bem = createBEM('confirm', { prefixCls });
  const cls = bem([className]);

  return (
    <Modal
      {...rest}
      ref={ref}
      className={cls}
      actions={[
        [
          {
            text: cancelText || locale?.Confirm.cancelText,
            onClick: onCancel,
          },
          {
            text: confirmText || locale?.Confirm.confirmText,
            bold: true,
            onClick: onConfirm,
          },
        ],
      ]}
    >
      {content}
    </Modal>
  );
});

Confirm.displayName = 'Confirm';

Confirm.defaultProps = {
  animationType: 'zoom',
  shape: 'radius',
};

export default Confirm;
