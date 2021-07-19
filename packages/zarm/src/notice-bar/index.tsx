import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Volume as VolumeIcon } from '@zarm-design/icons';
import type BaseNoticeBarProps from './interface';
import Message from '../message';
import { addKeyframe, removeKeyframe, existKeyframe } from '../utils/keyframes';
import { ConfigContext } from '../n-config-provider';

export type NoticeBarProps = BaseNoticeBarProps & React.HTMLAttributes<HTMLDivElement>;

const NoticeBar = forwardRef<unknown, NoticeBarProps>((props, ref) => {
  const { children, speed, delay, ...restProps } = props;

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-notice-bar`;
  const NOTICEBAR_KEYFRAME_NAME = `${globalPrefixCls}-notice-bar-scrolling`;

  const [animationDuration, setAnimationDuration] = useState(0);

  const noticeBarRef = (ref as any) || React.createRef<HTMLDivElement>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateScrolling = useCallback(() => {
    const wrapWidth = wrapperRef.current!.getBoundingClientRect().width;
    const offsetWidth = contentRef.current!.getBoundingClientRect().width;

    if (offsetWidth > wrapWidth) {
      // 完整的执行时间 = 前后停留时间 + 移动时间
      const newAnimationDuration = Math.round(delay! * 2 + (offsetWidth / speed!) * 1000);

      // 计算停留时间占总时间的百分比
      const delayPercent = Math.round((delay! * 100) / newAnimationDuration);

      // 删除之前的 keyframe 定义
      if (existKeyframe(NOTICEBAR_KEYFRAME_NAME)) {
        removeKeyframe(NOTICEBAR_KEYFRAME_NAME);
      }

      // 增加重新计算后的 keyframe
      addKeyframe(
        NOTICEBAR_KEYFRAME_NAME,
        `
        0%, ${delayPercent}% {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }

        ${100 - delayPercent}%, 100% {
          -webkit-transform: translate3d(${-(offsetWidth - wrapWidth)}px, 0, 0);
          transform: translate3d(${-(offsetWidth - wrapWidth)}px, 0, 0);
        }
      `,
      );
      setAnimationDuration(newAnimationDuration);
    }
  }, [NOTICEBAR_KEYFRAME_NAME, delay, speed]);

  useEffect(() => {
    updateScrolling();
  }, [updateScrolling]);

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
