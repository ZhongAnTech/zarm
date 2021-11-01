import * as React from 'react';
import classnames from 'classnames';
import type { BaseAlertProps } from './interface';
import Modal from '../modal';
import { ConfigContext } from '../n-config-provider';
import ModalButton from '../modal/ModalButton';

export interface AlertProps extends BaseAlertProps {
  className?: string;
  style?: React.CSSProperties;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { className, shape, content, cancelText, onCancel, ...rest } = props;
  const { prefixCls: globalPrefixCls, locale } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-alert`;
  const classes = classnames(prefixCls, className, {
    [`${prefixCls}--${shape}`]: !!shape,
  });

  return (
    <div className={classes}>
      <Modal
        {...rest}
        footer={
          <ModalButton
            className={`${prefixCls}__button`}
            loadingClassName={`${prefixCls}__button--loading`}
            onClick={onCancel}
          >
            {cancelText || locale?.Alert.cancelText}
          </ModalButton>
        }
      >
        {content}
      </Modal>
    </div>
  );
};

Alert.displayName = 'Alert';

Alert.defaultProps = {
  animationType: 'zoom',
  shape: 'radius',
};

export default Alert;
