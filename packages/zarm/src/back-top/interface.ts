import type { MountContainer, ScrollContainer } from '../utils/dom';

export interface BaseBackTopProps {
  speed?: number;
  visibleDistance?: number;
  scrollContainer?: ScrollContainer;
  mountContainer?: MountContainer;
  destroy?: boolean;
}
