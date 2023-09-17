import * as React from 'react';

export type DemoContextProps = {
  showDebug?: boolean;
};

export const DemoContext = React.createContext<{
  showDebug?: boolean;
  setShowDebug?: (showDebug: boolean) => void;
}>({});
