import React, { forwardRef, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { Volume as VolumeIcon } from '@zarm-design/icons';
import { createBEM } from '@zarm-design/bem';
import type BaseNoticeBarProps from './interface';
import Message from '../message';
import { ConfigContext } from '../n-config-provider';
import useAnimationDuration from './hooks';
import type { HTMLProps } from '../utils/utilityTypes';

export interface NoticeBarCssVars {
  '--height'?: React.CSSProperties['height'];
  '--font-size'?: React.CSSProperties['fontSize'];
  '--padding'?: React.CSSProperties['padding'];
  '--icon-size'?: React.CSSProperties['fontSize'];
}

export type NoticeBarProps = BaseNoticeBarProps &
  React.PropsWithChildren<HTMLProps<NoticeBarCssVars>> & {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  };

const NoticeBar = forwardRef<HTMLDivElement, NoticeBarProps>((props, ref) => {
  const { children, speed, delay, onClose, className, ...restProps } = props;
  const [visible, setVisible] = useState(true);
  const { prefixCls } = React.useContext(ConfigContext);

  const bem = createBEM('notice-bar', { prefixCls });
  const NOTICEBAR_KEYFRAME_NAME = `${prefixCls}-notice-bar-scrolling`;

  const noticeBarRef = ref || React.createRef<HTMLDivElement>();
  const contentRef = useRef<HTMLDivElement>(null);
  const animationDuration = useAnimationDuration({
    noticeBarRef,
    contentRef,
    delay,
    speed,
    keyframeName: NOTICEBAR_KEYFRAME_NAME,
  });

  if (!visible) return null;

  function handleClose(e: MouseEvent<HTMLElement>) {
    setVisible(false);
    onClose?.(e);
  }

  const cls = bem([className]);
  return (
    <div className={cls} ref={noticeBarRef}>
      <Message {...restProps} onClose={handleClose}>
        <div className={bem('body')}>
          <div
            className={bem('content')}
            ref={contentRef}
            style={
              animationDuration > 0
                ? {
                    WebkitAnimation: `${NOTICEBAR_KEYFRAME_NAME} ${animationDuration}ms linear infinite`,
                    animation: `${NOTICEBAR_KEYFRAME_NAME} ${animationDuration}ms linear infinite`,
                  }
                : undefined
            }
          >
            {children}
          </div>
        </div>
      </Message>
    </div>
  );
});

NoticeBar.displayName = 'NoticeBar';

NoticeBar.defaultProps = {
  theme: 'warning',
  icon: <VolumeIcon />,
  hasArrow: false,
  closable: false,
  speed: 50,
  delay: 2000,
};
export default NoticeBar;
