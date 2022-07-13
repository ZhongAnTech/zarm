import 'intersection-observer';
import { useEffect, MutableRefObject, useState } from 'react';

export type BasicTarget<T = Element> =
  | (() => T | null)
  | T
  | null
  | MutableRefObject<T | null | undefined>;

type TargetElement = Element;

interface Options {
  rootMargin?: string;
  threshold?: number | number[];
  root?: BasicTarget<Element>;
}

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

function useInViewport(target: BasicTarget, options?: Options): readonly [boolean | undefined] {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const el = getTargetElement(target);
    console.log(el);
    if (el) {
      const observer = new IntersectionObserver(
        (entries) => {
          // eslint-disable-next-line no-restricted-syntax
          for (const entry of entries) {
            setIsIntersecting(entry.isIntersecting);
          }
        },
        {
          ...options,
          root: getTargetElement(options?.root),
        },
      );

      observer.observe(el);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return [isIntersecting] as const;
}

export default useInViewport;
