import * as React from 'react';

function useSafeState<S>(initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>];

function useSafeState<S = undefined>(): [
  S | undefined,
  React.Dispatch<React.SetStateAction<S | undefined>>,
];

function useSafeState<S>(initialState?: S | (() => S)) {
  const [state, setState] = React.useState(initialState);
  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const update = React.useCallback((nextState) => {
    mounted.current && setState(nextState);
  }, []);

  return [state, update] as const;
}

export default useSafeState;
