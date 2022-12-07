import { ScrollContainer } from '../utils/dom';

export interface BaseAffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  scrollContainer?: ScrollContainer;
  onChange?(affixed: boolean): void;
}
