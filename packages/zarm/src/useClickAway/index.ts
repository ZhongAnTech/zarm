import { useEffect, useRef, MutableRefObject } from 'react';
import Events from '../utils/events';

export type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | MutableRefObject<T | null | undefined>;

type TargetElement = HTMLElement | Element | Document | Window;

export function getTargetElement(
  target?: BasicTarget<TargetElement>,
  defaultElement?: TargetElement,
): TargetElement | undefined | null {
  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetElement | undefined | null;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }
  return targetElement;
}

// 鼠标点击事件，click 不会监听右键
const defaultEvent = 'click';

export default function useClickAway(
  onClickAway?: (event: MouseEvent | TouchEvent) => void,
  target?: BasicTarget | BasicTarget[],
  eventName: string = defaultEvent,
) {
  const onClickAwayRef = useRef(onClickAway);

  useEffect(() => {
    onClickAwayRef.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const handler = (event: any) => {
      const targets = Array.isArray(target) ? target : [target];

      if (
        targets.some((targetItem) => {
          const targetElement = getTargetElement(targetItem) as HTMLElement;
          return !targetElement || targetElement.contains(event.target);
        })
      ) {
        return;
      }
      onClickAwayRef.current!(event);
    };

    window.setTimeout(() => {
      Events.on(document, eventName, handler);
    }, 50);

    return () => {
      Events.off(document, eventName, handler);
    };
  }, [target, eventName]);
}
