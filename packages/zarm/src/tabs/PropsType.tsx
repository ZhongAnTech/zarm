import * as React from 'react';

export interface TabsProps {
  value?: number;
  defaultValue?: number;
  lineWidth?: string | number;
  disabled?: boolean;
  swipeable?: boolean;
  scrollable?: boolean;
  direction?: 'horizontal' | 'vertical';
  onChange?: (index?: number) => void;
  children?: React.ReactNode;
}

export interface TabPanelProps {
  selected?: boolean;
  disabled?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
}
