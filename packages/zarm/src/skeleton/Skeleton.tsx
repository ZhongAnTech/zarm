import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import type { SkeletonShape, SkeletonLineShape } from './interface';

// SkeletonTitle和SkeletonParagraph的shape属性值集合
const SKELETONLINESHAPE = ['radius', 'rect'];

export interface SkeletonCssVars {
  '--width'?: React.CSSProperties['width'];
  '--height'?: React.CSSProperties['height'];
  '--border-radius'?: React.CSSProperties['borderRadius'];
  '--margin'?: React.CSSProperties['margin'];
}

export type SkeletonProps = HTMLProps<SkeletonCssVars> & {
  shape?: SkeletonShape;
  animated?: boolean;
};

export type SkeletonTitleProps = HTMLProps<SkeletonCssVars> & {
  shape?: SkeletonLineShape;
  animated?: boolean;
};

export type SkeletonParagraphProps = HTMLProps & {
  shape?: SkeletonLineShape;
  animated?: boolean;
  lineCount?: number;
};

const Skeleton = (props: SkeletonProps) => {
  const { className, shape, animated, ...restProps } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('skeleton', { prefixCls });
  const cls = bem([
    {
      [`${shape}`]: !!shape,
      animated,
    },
    className,
  ]);

  return <div className={cls} {...restProps} />;
};

Skeleton.displayName = 'skeleton';

Skeleton.defaultProps = {
  shape: 'radius',
};

// SkeletonTitle
const SkeletonTitle = (props: SkeletonTitleProps) => {
  const { className, shape, ...restProps } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('skeleton', { prefixCls });
  const cls = bem('title', [className]);
  const _shape = shape && SKELETONLINESHAPE.includes(shape) ? shape : undefined;

  return <Skeleton shape={_shape} className={cls} {...restProps} />;
};

// SkeletonParagraph
const SkeletonParagraph = (props: SkeletonParagraphProps) => {
  const { className, shape, lineCount = 3, animated, ...restProps } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('skeleton', { prefixCls });
  const cls = bem('paragraph', [className]);
  const lineCls = bem('line');
  const _shape = shape && SKELETONLINESHAPE.includes(shape) ? shape : undefined;

  return (
    <div className={cls} {...restProps}>
      {lineCount > 0
        ? Array(lineCount)
            .fill(1)
            .map((...arg) => (
              <Skeleton key={arg[1]} shape={_shape} animated={animated} className={lineCls} />
            ))
        : null}
    </div>
  );
};

export default Skeleton;
export { SkeletonTitle, SkeletonParagraph };
