import { CSSProperties } from 'react';
import { ContainerType } from '../utils/dom';

export default interface PropsType {
  style?: CSSProperties;
  speed?: number;
  visibleDistance?: number;
  scrollContainer?: ContainerType;
}
