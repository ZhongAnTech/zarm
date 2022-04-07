import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import type { BaseConfirmProps } from './interface';
import Modal from '../modal';
import { ConfigContext } from '../n-config-provider';
import type { HTMLProps } from '../utils/utilityTypes';

export type ConfirmProps = BaseConfirmProps & HTMLProps;

const Confirm = React.forwardRef<HTMLDivElement, ConfirmProps>((props, ref) => {
  const { className, content, okText, cancelText, onOk, onCancel, ...rest } = props;
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
              text: okText || locale?.Confirm.okText,
              bold: true,
              onClick: onOk,
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
