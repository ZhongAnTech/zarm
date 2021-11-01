import * as React from 'react';
import classnames from 'classnames';
import type { BaseConfirmProps } from './interface';
import Modal from '../modal';
import ModalButton from '../modal/ModalButton';
import { ConfigContext } from '../n-config-provider';

export interface ConfirmProps extends BaseConfirmProps {
  className?: string;
  style?: React.CSSProperties;
}

const Confirm: React.FC<ConfirmProps> = (props) => {
  const { className, shape, content, okText, cancelText, onOk, onCancel, ...rest } = props;
  const { prefixCls: globalPrefixCls, locale } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-confirm`;
  const classes = classnames(prefixCls, className, {
    [`${prefixCls}--${shape}`]: !!shape,
  });

  const loadingClassName = `${prefixCls}__button--loading`;

  return (
    <div className={classes}>
      <Modal
        {...rest}
        footer={
          <>
            <ModalButton
              className={`${prefixCls}__button`}
              loadingClassName={loadingClassName}
              onClick={onCancel}
            >
              {cancelText || locale?.Confirm.cancelText}
            </ModalButton>
            <ModalButton
              className={`${prefixCls}__button ${prefixCls}__button--ok`}
              loadingClassName={loadingClassName}
              onClick={onOk}
            >
              {okText || locale?.Confirm.okText}
            </ModalButton>
          </>
        }
      >
        {content}
      </Modal>
    </div>
  );
};

Confirm.displayName = 'Confirm';

Confirm.defaultProps = {
  animationType: 'zoom',
  shape: 'radius',
};

export default Confirm;
