import { createBEM } from '@zarm-design/bem';
import { ArrowRight as ArrowRightIcon, Close as CloseIcon } from '@zarm-design/icons';
import type { MouseEvent } from 'react';
import React, { forwardRef, useContext, useState } from 'react';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseMessageProps } from './interface';

export interface MessageCssVars {
  '--line-height'?: React.CSSProperties['lineHeight'];
  '--font-size'?: React.CSSProperties['fontSize'];
  '--icon-size'?: React.CSSProperties['fontSize'];
  '--padding'?: React.CSSProperties['padding'];
}

export type MessageProps = BaseMessageProps &
  React.PropsWithChildren<HTMLProps<MessageCssVars>> & {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  };

const Message = forwardRef<HTMLDivElement, MessageProps>((props, ref) => {
  const { className, theme, icon, hasArrow, closable, children, onClick, onClose, ...restProps } =
    props;
  const [visible, setVisible] = useState(true);
  const { prefixCls } = useContext(ConfigContext);

  if (!visible) return null;

  const bem = createBEM('message', { prefixCls });

  const cls = bem([
    {
      [`${theme}`]: !!theme,
      link: hasArrow,
    },
    className,
  ]);

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    if (!hasArrow) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  }

  function handleClose(e: MouseEvent<HTMLElement>) {
    setVisible(false);
    onClose?.(e);
  }

  return (
    <div ref={ref} className={cls} onClick={handleClick} {...restProps}>
      {icon && (
        <div className={bem('header')}>
          <div className={bem('icon')}>{icon}</div>
        </div>
      )}
      <div className={bem('body')}>{children}</div>
      {(closable || hasArrow) && (
        <div className={bem('footer')}>
          {hasArrow && <ArrowRightIcon />}
          {closable && <CloseIcon onClick={handleClose} />}
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
