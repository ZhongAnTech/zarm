import React, { forwardRef, useRef } from 'react';
import { Volume as VolumeIcon } from '@zarm-design/icons';
import type BaseNoticeBarProps from './interface';
import Message from '../message';
import { ConfigContext } from '../n-config-provider';
import useAnimationDuration from './hooks';

export type NoticeBarProps = BaseNoticeBarProps & React.HTMLAttributes<HTMLDivElement>;

const NoticeBar = forwardRef<HTMLDivElement, NoticeBarProps>((props, ref) => {
  const { children, speed, delay, ...restProps } = props;

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-notice-bar`;
  const NOTICEBAR_KEYFRAME_NAME = `${globalPrefixCls}-notice-bar-scrolling`;

  const noticeBarRef = ref || React.createRef<HTMLDivElement>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationDuration = useAnimationDuration({
    wrapperRef,
    contentRef,
    delay,
    speed,
    keyframeName: NOTICEBAR_KEYFRAME_NAME,
  });

  return (
    <div className={prefixCls} ref={wrapperRef}>
      <Message {...restProps} size="lg" ref={noticeBarRef}>
        <div className={`${prefixCls}__body`}>
          <div
            className={`${prefixCls}__content`}
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
