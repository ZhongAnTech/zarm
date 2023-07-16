import * as React from 'react';

export const useLayoutState = <S>(initialState: S): ReturnType<typeof React.useState<S>> => {
  const [state, setState] = React.useState<S>(initialState);

  const setLayoutState: typeof setState = (...setStateArgs) => {
    React.startTransition(() => {
      setState(...setStateArgs);
    });
  };

  return [state, setLayoutState];
};
