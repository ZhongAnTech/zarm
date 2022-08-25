import Skeleton, { SkeletonTitle as Title, SkeletonParagraph as Paragraph } from './Skeleton';
import attachPropertiesToComponent from '../utils/attachPropertiesToComponent';

export type { SkeletonProps, SkeletonTitleProps, SkeletonParagraphProps } from './interface';

export default attachPropertiesToComponent(Skeleton, { Title, Paragraph });
