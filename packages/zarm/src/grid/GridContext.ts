import * as React from 'react';

export interface GridContextState {
  columns?: number;
  gutter?: [number, number];
  bordered?: boolean;
  square?: boolean;
}

const GridContext = React.createContext<GridContextState>({});

export default GridContext;
