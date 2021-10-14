import * as React from 'react';
import { isFunction } from '../../validate';

const useSetState = <T extends object>(
  initialState: T,
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] => {
  const [state, setState] = React.useState<T>(initialState || {});

  const batchUpdateState = React.useCallback((patch) => {
    setState((prevState) => ({ ...prevState, ...(isFunction(patch) ? patch(prevState) : patch) }));
  }, []);

  return [state, batchUpdateState];
};

export default useSetState;
