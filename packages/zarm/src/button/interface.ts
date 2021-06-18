import * as React from 'react';

export type ButtonTheme = 'default' | 'primary' | 'danger';
export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';
export type ButtonShape = 'radius' | 'rect' | 'round' | 'circle';

export interface BaseButtonProps {
  theme?: ButtonTheme;
  size?: ButtonSize;
  shape?: ButtonShape;
  block?: boolean;
  ghost?: boolean;
  shadow?: boolean;
  focus?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}
