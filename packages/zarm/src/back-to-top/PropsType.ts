import type { CSSProperties } from 'react';
import type { ContainerType } from '../utils/dom';

export default interface PropsType {
  style?: CSSProperties;
  speed?: number;
  visibleDistance?: number;
  scrollContainer?: ContainerType;
}
