import * as React from 'react';

export interface BaseImagePropsProps {
  src?: string;
  placeholder?: React.ReactNode;
  fallback?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  alt?: string;
  onLoad?: () => void;
  onError?: () => void;
}
