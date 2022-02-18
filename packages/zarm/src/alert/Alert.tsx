import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import Modal from '../modal';
import type { BaseAlertProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export type AlertProps = BaseAlertProps & HTMLProps;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { className, content, cancelText, onCancel, ...rest } = props;
  const { prefixCls, locale } = React.useContext(ConfigContext);
  const bem = createBEM('alert', { prefixCls });
  const cls = bem([className]);

  return (
    <div ref={ref} className={cls}>
      <Modal
        {...rest}
        actions={[
          {
            text: cancelText || locale?.Confirm.cancelText,
            onClick: onCancel,
            bold: true,
          },
        ]}
      >
        {content}
      </Modal>
    </div>
  );
});

Alert.displayName = 'Alert';

Alert.defaultProps = {
  animationType: 'zoom',
  shape: 'radius',
};

export default Alert;
