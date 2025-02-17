import { ReactNode } from 'react';

export interface BaseListProps {
  bordered?: boolean;
}

export interface BaseListItemProps {
  hasArrow?: boolean;
  prefix?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  suffix?: ReactNode;
  children?: ReactNode;
}
