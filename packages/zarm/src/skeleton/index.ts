import Skeleton, { SkeletonTitle as Title, SkeletonParagraph as Paragraph } from './Skeleton';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';

export type {
  SkeletonProps,
  SkeletonTitleProps,
  SkeletonParagraphProps,
  SkeletonCssVars,
} from './Skeleton';

export default attachPropertiesToComponent(Skeleton, { Title, Paragraph });
