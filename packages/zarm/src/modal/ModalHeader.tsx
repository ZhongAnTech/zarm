import React from 'react';
import classnames from 'classnames';
import { Close as CloseIcon } from '@zarm-design/icons';
import { ConfigContext } from '../n-config-provider';
import { BaseModalHeaderProps } from './interface';

export type ModalHeaderProps = BaseModalHeaderProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;

const ModalHeader = React.forwardRef<unknown, ModalHeaderProps>((props, ref) => {
  const headerRef = (ref as any) || React.createRef<HTMLElement>();
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-modal`;

  const { className, title, closable, onCancel, ...others } = props;
  const cls = classnames(`${prefixCls}__header`, className);

  const btnClose = closable && (
    <CloseIcon size="sm" className={`${prefixCls}__header__close`} onClick={onCancel} />
  );
  return (
    <div className={cls} {...others} ref={headerRef}>
      <div className={`${prefixCls}__header__title`}>{title}</div>
      {btnClose}
    </div>
  );
});

ModalHeader.displayName = 'ModalHeader';

ModalHeader.defaultProps = {};

export default ModalHeader;
