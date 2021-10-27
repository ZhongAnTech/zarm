import * as React from 'react';

const config: MutationObserverInit = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
};

const useMutationObserverRef = (
  callback: MutationCallback,
  options: MutationObserverInit = config,
): [(node: HTMLElement | null) => void] => {
  const [node, setNode] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (node) {
      const observer = new MutationObserver(callback);
      observer.observe(node, options);

      return () => {
        observer.disconnect();
      };
    }
  }, [node, callback, options]);

  return [setNode];
};

export default useMutationObserverRef;
