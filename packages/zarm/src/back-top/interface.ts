import type { ContainerType } from '../utils/dom';

export interface BaseBackTopProps {
  speed?: number;
  visibleDistance?: number;
  scrollContainer?: ContainerType;
  mountContainer?: ContainerType;
  destroy?: boolean;
}
