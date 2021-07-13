import React, { forwardRef, useState } from 'react';
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

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
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
  theme: 'primary',
  hasArrow: false,
  closable: false,
};

export default Message;
