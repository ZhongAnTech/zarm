import { ReactNode } from 'react';

export interface BaseListItemProps {
  prefix?: ReactNode;
  title?: ReactNode;
  info?: ReactNode;
  after?: ReactNode;
  children?: ReactNode;
}
