import { ContainerType } from '../utils/dom';

export interface AffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  scrollContainer?: ContainerType;
  onChange?(affixed: boolean): void;
}
