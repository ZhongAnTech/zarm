import React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';

export type ModalBodyProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const ModalBody = React.forwardRef<unknown, ModalBodyProps>((props, ref) => {
  const { className, children } = props;

  const bodyRef = (ref as any) || React.createRef<HTMLElement>();
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-modal`;

  const cls = classnames(`${prefixCls}__body`, className);

  return (
    <div className={cls} ref={bodyRef}>
      {children}
    </div>
  );
});

export default ModalBody;
