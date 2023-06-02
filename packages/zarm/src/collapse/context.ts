import { createContext } from 'react';

interface CollapseContextValue {
  isActive?: (key: number | string) => boolean;
  toggleItem?: (key: number | string, isActive: boolean) => void;
}

const CollapseContext = createContext<CollapseContextValue>({});

export default CollapseContext;
