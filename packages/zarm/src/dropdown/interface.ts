import * as React from 'react';

export interface BaseDropdownProps {
  activeKey?: number | string;
  defaultActiveKey?: number | string;
  onChange?: (activeKey: number | string) => void;
  arrow?: React.ReactNode;
}

export interface BaseDropdownItemProps {
  key?: number | string;
  title?: React.ReactNode;
  arrow?: React.ReactNode;
  children?: React.ReactNode;
}
