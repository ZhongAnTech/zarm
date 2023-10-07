import { createContext } from 'react';

interface TabsContextProps {
  current?: string;
}

const TabsContext = createContext<TabsContextProps>({});

export default TabsContext;
