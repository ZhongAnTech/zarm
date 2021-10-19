import * as React from 'react';
import classnames from 'classnames';
import { Close as CloseIcon } from '@zarm-design/icons';
import { BaseModalProps } from './interface';
import { ConfigContext } from '../n-config-provider';
import Popup from '../popup';

export interface ModalProps extends BaseModalProps {
  className?: string;
  style?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    className,
    title,
    shape,
    closable,
    onCancel,
    children,
    footer,
    maskClosable,
    ...rest
  } = props;

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-modal`;

  const classes = classnames(prefixCls, className, {
    [`${prefixCls}--${shape}`]: !!shape,
  });

  const showHeader = title || closable;
  const noop = () => {};

  return (
    <Popup
      {...rest}
      className={classes}
      direction="center"
      onMaskClick={maskClosable ? onCancel : noop}
    >
      <div className={classnames(`${prefixCls}__dialog`)}>
        {showHeader && (
          <div className={`${prefixCls}__header`}>
            <div className={`${prefixCls}__header__title`}>{title}</div>
            {closable && (
              <CloseIcon size="sm" className={`${prefixCls}__header__close`} onClick={onCancel} />
            )}
          </div>
        )}
        <div className={`${prefixCls}__body`}>{children}</div>
        {footer && <div className={`${prefixCls}__footer`}>{footer}</div>}
      </div>
    </Popup>
  );
};

Modal.defaultProps = {
  visible: false,
  animationType: 'fade',
  animationDuration: 200,
  width: '70%',
  mask: true,
  maskType: 'normal',
  shape: 'radius',
  closable: false,
  maskClosable: false,
  destroy: true,
};

export default Modal;
