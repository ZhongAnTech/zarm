import { ContainerType } from '../utils/dom';

export interface BaseAffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  scrollContainer?: ContainerType;
  onChange?(affixed: boolean): void;
}
