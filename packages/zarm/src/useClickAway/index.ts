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

export default function useClickAway(
  target: BasicTarget | BasicTarget[],
  onClickAway?: (event: React.MouseEvent | React.TouchEvent) => void,
  eventName = 'click',
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
          return !targetElement || (targetElement.contains && targetElement.contains(event.target));
        })
      ) {
        return;
      }
      onClickAwayRef.current!(event);
    };

    Events.on(document, eventName, handler);

    return () => {
      Events.off(document, eventName, handler);
    };
  }, [target, eventName]);
}
