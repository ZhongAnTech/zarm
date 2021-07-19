import React, { forwardRef, useState, useContext } from 'react';
import type { HTMLAttributes, MouseEvent } from 'react';
import classnames from 'classnames';
import { ArrowRight as ArrowRightIcon, Close as CloseIcon } from '@zarm-design/icons';
import { ConfigContext } from '../n-config-provider';
import type { BaseMessageProps } from './interface';

export type MessageProps = BaseMessageProps & HTMLAttributes<HTMLDivElement>;

const Message = forwardRef<HTMLDivElement, MessageProps>((props, ref) => {
  const {
    className,
    theme,
    size,
    icon,
    hasArrow,
    closable,
    children,
    onClick,
    ...restProps
  } = props;
  const [visible, setVisible] = useState(true);
  const { prefixCls: globalPrefixCls } = useContext(ConfigContext);

  if (!visible) return null;

  const prefixCls = `${globalPrefixCls}-message`;
  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--${theme}`]: theme,
    [`${prefixCls}--${size}`]: size,
    [`${prefixCls}--link`]: hasArrow,
  });

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    if (!hasArrow) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  }

  return (
    <div ref={ref} className={cls} onClick={handleClick} {...restProps}>
      {icon && (
        <div className={`${prefixCls}__header`}>
          <div className={`${prefixCls}__icon`}>{icon}</div>
        </div>
      )}
      <div className={`${prefixCls}__body`}>{children}</div>
      {(closable || hasArrow) && (
        <div className={`${prefixCls}__footer`}>
          {hasArrow && <ArrowRightIcon />}
          {closable && <CloseIcon onClick={() => setVisible(false)} />}
        </div>
      )}
    </div>
  );
});

Message.displayName = 'Message';

Message.defaultProps = {
  theme: 'primary',
  hasArrow: false,
  closable: false,
};

export default Message;
