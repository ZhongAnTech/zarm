import React from 'react';

export interface BaseIconProps {
  type?: string;
  theme?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'lg';
  component?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  viewBox?: string;
  mode?: 'auto' | 'svg' | 'font';
  children?: React.ReactNode;
}
