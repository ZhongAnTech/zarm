import 'intersection-observer';
import { useEffect, useState } from 'react';
import { BasicTarget, getTargetElement } from '../utils/getTargetElement';

interface Options {
  rootMargin?: string;
  threshold?: number | number[];
  root?: BasicTarget<Element>;
}

function useInViewport(target: BasicTarget, options?: Options): readonly [boolean | undefined] {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const el = getTargetElement(target);
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
