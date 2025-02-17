import * as React from 'react';

export interface IconContextProps {
  prefixCls?: string;
}

export const IconContext = React.createContext<IconContextProps>({});
