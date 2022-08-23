export type SkeletonShape = 'radius' | 'rect' | 'circle';

export interface BaseskeletonProps {
  className: string;
}

export interface SkeletonProps extends BaseskeletonProps {
  shape?: SkeletonShape;
  width?: number;
  height?: number;
  animated?: boolean;
}
