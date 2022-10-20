import React, { useImperativeHandle, useRef } from 'react';
import type { ForwardedRef } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import type { BaseProgressProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';
import {
  useSizeStyle,
  useSVGStrokeWidth,
  useSVG,
  useStrokeWidthWithBackup,
  useRoundSVGAttributes,
  useRectStyles,
  useIndicator,
} from './hooks';

export interface ProgressCssVars {
  '--background'?: React.CSSProperties['background'];
  '--width'?: React.CSSProperties['width'];
  '--size'?: React.CSSProperties['width' | 'height'];
  '--font-size-circle'?: React.CSSProperties['fontSize'];
}

export type ProgressProps = BaseProgressProps & React.PropsWithChildren<HTMLProps<ProgressCssVars>>;

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      theme,
      shape,
      size,
      percent,
      strokeShape,
      text,
      className,
      style,
      children,
      strokeWidth,
      ...htmlAttributes
    }: React.PropsWithChildren<ProgressProps>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const progressElement = useRef<HTMLDivElement>(null);
    const { sizeStyle, hasKnownSize } = useSizeStyle({ shape, size });
    const shouldUseSVG = useSVG({ shape });
    const strokeWidthWithBackup = useStrokeWidthWithBackup({ strokeWidth });
    const { svgStrokeWidth } = useSVGStrokeWidth({
      strokeWidth: strokeWidthWithBackup,
      size,
      shape,
      progressElement,
      shouldUseSVG,
    });
    useImperativeHandle(ref, () => progressElement.current!);

    const finalStrokeWidth = shouldUseSVG ? svgStrokeWidth : strokeWidthWithBackup;

    const { viewBox, dasharray, strokeLinecap, path, dashoffset } = useRoundSVGAttributes({
      shape,
      strokeShape,
      percent,
      finalStrokeWidth,
    });

    const { lineThumbStyle, lineTrackStyle } = useRectStyles({
      percent,
      strokeWidthWithBackup,
      finalStrokeWidth,
      strokeShape,
    });

    const indicator = useIndicator({ percent, children, text });

    const { prefixCls } = React.useContext(ConfigContext);
    const bem = createBEM('progress', { prefixCls });

    const cls = bem([
      {
        [`${shape}`]: !!shape,
        [`${theme}`]: !!theme,
        [`${size}`]: hasKnownSize,
      },
      className,
    ]);

    const roundInner = (
      <>
        <svg viewBox={viewBox}>
          <path
            className={bem('track')}
            d={path}
            strokeWidth={finalStrokeWidth}
            strokeLinecap={strokeLinecap}
          />
          <path
            className={bem('thumb')}
            d={path}
            strokeWidth={finalStrokeWidth}
            strokeLinecap={strokeLinecap}
            strokeDasharray={dasharray}
            strokeDashoffset={dashoffset}
          />
        </svg>
        {indicator && <div className={bem('text')}>{indicator}</div>}
      </>
    );

    const rectInner = (
      <div className={bem('outer')}>
        <div className={bem('track')} style={lineTrackStyle}>
          <div className={bem('thumb')} style={lineThumbStyle} />
        </div>
        {indicator && <div className={bem('text')}>{indicator}</div>}
      </div>
    );

    return (
      <div
        className={cls}
        style={{ ...sizeStyle, ...style }}
        ref={progressElement}
        {...htmlAttributes}
      >
        {shape === 'line' && rectInner}
        {(shape === 'circle' || shape === 'semi-circle') && roundInner}
      </div>
    );
  },
);

Progress.displayName = 'Progress';

Progress.defaultProps = {
  theme: 'primary',
  shape: 'line',
  size: 'md',
  percent: 0,
  strokeShape: 'round',
  text: (val: number) => `${val}%`,
};

export default Progress;
