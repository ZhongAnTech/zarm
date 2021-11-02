import { useCallback, useEffect, useState } from 'react';
import { addKeyframe, removeKeyframe, existKeyframe } from '../utils/keyframes';

export default function useAnimationDuration({
  noticeBarRef,
  contentRef,
  delay,
  speed,
  keyframeName,
}) {
  const [animationDuration, setAnimationDuration] = useState(0);
  const updateScrolling = useCallback(() => {
    if (!noticeBarRef.current || !contentRef.current) return;
    const wrapWidth = noticeBarRef.current.getBoundingClientRect().width;
    const contentWidth = contentRef.current.getBoundingClientRect().width;

    if (contentWidth > wrapWidth) {
      // 完整的执行时间 = 前后停留时间 + 移动时间
      const newAnimationDuration = Math.round(delay! * 2 + (contentWidth / speed!) * 1000);

      // 计算停留时间占总时间的百分比
      const delayPercent = Math.round((delay! * 100) / newAnimationDuration);

      // 删除之前的 keyframe 定义
      if (existKeyframe(keyframeName)) {
        removeKeyframe(keyframeName);
      }

      // 增加重新计算后的 keyframe
      addKeyframe(
        keyframeName,
        `
        0%, ${delayPercent}% {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }

        ${100 - delayPercent}%, 100% {
          -webkit-transform: translate3d(${-(contentWidth - wrapWidth)}px, 0, 0);
          transform: translate3d(${-(contentWidth - wrapWidth)}px, 0, 0);
        }
      `,
      );
      setAnimationDuration(newAnimationDuration);
    }
  }, [keyframeName, delay, speed, noticeBarRef, contentRef]);

  useEffect(() => {
    updateScrolling();
  }, [updateScrolling]);

  return animationDuration;
}
