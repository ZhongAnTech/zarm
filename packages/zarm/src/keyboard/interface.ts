import * as React from 'react';

export interface KeyBoardKey {
  value?: string | number;
  text?: React.ReactNode;
  rowSpan?: number;
  colSpan?: number;
  disabled?: boolean;
}

export interface KeyBoardDataSource {
  columns?: number;
  keys?: KeyBoardKey['text'][] | KeyBoardKey[];
}

export interface BaseKeyBoardProps {
  type?: 'number' | 'price' | 'idcard';
  onKeyClick?: (key: KeyBoardKey['value']) => void;
  dataSource?: KeyBoardDataSource;
}
