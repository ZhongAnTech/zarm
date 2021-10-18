import type { CSSProperties } from 'react';
import type { ContainerType } from '../utils/dom';

export interface BackToTopProps {
  style?: CSSProperties;
  speed?: number;
  visibleDistance?: number;
  scrollContainer?: ContainerType;
}
