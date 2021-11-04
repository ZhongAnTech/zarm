import * as React from 'react';

const config = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
};

type useMutationObserverRefTarget = HTMLElement | null;

const useMutationObserverRef = (
  callback: MutationCallback,
  options: MutationObserverInit = config,
): [useMutationObserverRefTarget, (node: useMutationObserverRefTarget) => void] => {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (target) {
      const observer = new MutationObserver(callback);
      observer.observe(target, options);

      return () => {
        observer.disconnect();
      };
    }
  }, [target, callback, options]);

  return [target, setTarget];
};

export default useMutationObserverRef;
