import * as React from 'react';

const useUpdateEffect: typeof React.useEffect = (effect, deps) => {
  const mounted = React.useRef(false);

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
