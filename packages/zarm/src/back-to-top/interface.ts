import type { ContainerType } from '../utils/dom';

export default interface BaseBackTopTopProps {
  speed?: number;
  visibleDistance?: number;
  scrollContainer?: ContainerType;
  mountContainer?: ContainerType | false;
}
