import React from 'react';
import type { MountContainer, ScrollContainer } from '../utils/dom';

export interface BaseBackTopProps {
  speed?: number;
  duration?: number;
  visibleDistance?: number;
  scrollContainer?: ScrollContainer;
  mountContainer?: MountContainer;
  destroy?: boolean;
  children?: React.ReactNode;
}
