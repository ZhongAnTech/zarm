import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import type { BaseConfirmProps } from './interface';
import Modal from '../modal';
import { ConfigContext } from '../n-config-provider';
import type { HTMLProps } from '../utils/utilityTypes';

export type ConfirmProps = BaseConfirmProps & HTMLProps;

const Confirm = React.forwardRef<HTMLDivElement, ConfirmProps>((props, ref) => {
  const { className, content, confirmText, cancelText, onConfirm, onCancel, ...rest } = props;
  const { prefixCls, locale } = React.useContext(ConfigContext);
  const bem = createBEM('confirm', { prefixCls });
  const cls = bem([className]);

  return (
    <div className={cls} ref={ref}>
      <Modal
        {...rest}
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
    </div>
  );
});

Confirm.displayName = 'Confirm';

Confirm.defaultProps = {
  animationType: 'zoom',
  shape: 'radius',
};

export default Confirm;
