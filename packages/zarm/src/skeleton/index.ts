import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';
import Skeleton, { SkeletonParagraph as Paragraph, SkeletonTitle as Title } from './Skeleton';

export type {
  SkeletonCssVars,
  SkeletonParagraphProps,
  SkeletonProps,
  SkeletonTitleProps,
} from './Skeleton';

export default attachPropertiesToComponent(Skeleton, { Title, Paragraph });
