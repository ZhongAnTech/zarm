import React, { FC, useEffect, useRef } from 'react';
import useInViewport from '../useInViewport';

interface Props {
  onActive: () => void;
}

const LazyDetector: FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inViewport] = useInViewport(ref);

  useEffect(() => {
    if (inViewport) {
      props.onActive();
    }
  }, [inViewport]);

  return <div ref={ref} />;
};

export default LazyDetector;
