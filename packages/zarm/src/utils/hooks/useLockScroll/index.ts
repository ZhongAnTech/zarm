import isFunction from 'lodash/isFunction';
import * as React from 'react';
import { canUseDOM } from '../../dom';

let totalLockCount = 0;
const originalOverflow = canUseDOM ? document.body.style.overflow : '';

const useLockScroll = (shouldLock: boolean | (() => boolean)) => {
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
      document.body.style.overflow = originalOverflow || '';
    }
  };

  React.useEffect(() => {
    if (isFunction(shouldLock) ? shouldLock() : shouldLock) {
      lock();
      return unlock;
    }
  }, [shouldLock]);
};

export default useLockScroll;
