import { ArrowRight as ArrowRightIcon, Close as CloseIcon } from '@zarm-design/icons';
import classnames from 'classnames';
import type { HTMLAttributes, MouseEvent } from 'react';
import React, { forwardRef, useState } from 'react';
import type { BaseMessageProps } from './interface';

export interface MessageProps extends BaseMessageProps, HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
}

const Message = forwardRef<HTMLDivElement, MessageProps>((props, ref) => {
  const {
    prefixCls,
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

  function handleClose() {
    setVisible(false);
  }

  const iconRender = icon && <div className={`${prefixCls}__icon`}>{icon}</div>;
  const closeIconRender = closable && <CloseIcon onClick={handleClose} />;
  const arrowRender = hasArrow && <ArrowRightIcon />;
  const noFooter = !closable && !hasArrow;

  if (visible) {
    return (
      <div ref={ref} className={cls} onClick={handleClick} {...restProps}>
        <div className={`${prefixCls}__header`}>{iconRender}</div>
        <div className={`${prefixCls}__body`}>{children}</div>
        {!noFooter && (
          <div className={`${prefixCls}__footer`}>
            {arrowRender}
            {closeIconRender}
          </div>
        )}
      </div>
    );
  }

  return null;
});

Message.displayName = 'Message';

Message.defaultProps = {
  prefixCls: 'za-message',
  theme: 'primary',
  hasArrow: false,
  closable: false,
};

export default Message;
