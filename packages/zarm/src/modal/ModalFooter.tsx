import React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';

export interface ModalFooterProps {
  children?: React.ReactNode;
}

const ModalFooter = React.forwardRef<unknown, ModalFooterProps>((props, ref) => {
  const footerRef = (ref as any) || React.createRef<HTMLElement>();
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-modal`;

  const { children } = props;
  const cls = classnames(`${prefixCls}__footer`);
  return (
    <div className={cls} ref={footerRef}>
      {children}
    </div>
  );
});

ModalFooter.displayName = 'ModalFooter';
ModalFooter.defaultProps = {};

export default ModalFooter;
