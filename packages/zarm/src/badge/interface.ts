import * as React from 'react';

export interface BaseBadgeProps {
  text?: React.ReactNode;
  shape?: 'dot' | 'radius' | 'round' | 'rect' | 'circle' | 'leaf';
  bordered: boolean;
  children?: React.ReactNode;
}
