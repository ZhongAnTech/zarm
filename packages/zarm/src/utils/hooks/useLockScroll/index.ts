import * as React from 'react';
import { isFunction } from '../../validate';

let totalLockCount = 0;

const useLockScroll = (shouldLock: boolean | (() => boolean)) => {
  const originalOverflow = React.useRef<React.CSSProperties['overflow']>();
  const lock = () => {
    if (!totalLockCount) {
      document.body.style.overflow = 'hidden';
    }

    totalLockCount += 1;
  };
  const unlock = () => {
    if (!totalLockCount) return;

    totalLockCount -= 1;

    if (!totalLockCount) {
      document.body.style.overflow = originalOverflow.current || '';
    }
  };

  React.useEffect(() => {
    originalOverflow.current = document.body.style.overflow;
  }, []);

  React.useEffect(() => {
    if (isFunction(shouldLock) ? shouldLock() : shouldLock) {
      lock();
      return unlock;
    }
  }, [shouldLock]);
};

export default useLockScroll;
