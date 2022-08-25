import type { HTMLProps } from '../utils/utilityTypes';

type SkeletonShape = 'radius' | 'rect' | 'circle';

type SkeletonLineShape = 'radius' | 'rect';

export interface SkeletonCssVars {
  '--width'?: React.CSSProperties['width'];
  '--height'?: React.CSSProperties['height'];
  '--border-radius'?: React.CSSProperties['borderRadius'];
  '--margin'?: React.CSSProperties['margin'];
}
interface BaseskeletonProps extends HTMLProps<SkeletonCssVars> {
  animated?: boolean;
}

export interface SkeletonProps extends BaseskeletonProps {
  shape?: SkeletonShape;
}

export interface SkeletonTitleProps extends BaseskeletonProps {
  shape?: SkeletonLineShape;
}

export interface SkeletonParagraphProps extends HTMLProps {
  animated?: boolean;
  shape?: SkeletonLineShape;
  lineCount?: number;
}
