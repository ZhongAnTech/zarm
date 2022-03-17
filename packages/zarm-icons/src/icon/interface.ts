import React from 'react';

export interface BaseIconProps {
  prefixCls?: string;
  type?: string;
  theme?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'lg';
  component?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  viewBox?: string;
  mode?: 'auto' | 'svg' | 'font';
}
