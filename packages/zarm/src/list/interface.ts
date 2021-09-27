import { ReactNode } from 'react';

export interface BaseListItemProps {
  hasArrow?: boolean;
  prefix?: ReactNode;
  title?: ReactNode;
  info?: ReactNode;
  after?: ReactNode;
  children?: ReactNode;
}
