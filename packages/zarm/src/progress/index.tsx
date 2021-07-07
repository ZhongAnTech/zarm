import React, { useImperativeHandle, useRef } from 'react';
import type { ForwardedRef, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import type { BaseProgressProps } from './interface';
import {
  useSizeStyle,
  useSVGStrokeWidth,
  useSVG,
  useStrokeWidthWithBackup,
  useRoundSVGAttributes,
  useRectStyles,
  useIndicator,
} from './hooks';

export interface ProgressProps extends BaseProgressProps, HTMLAttributes<HTMLDivElement> {
  className?: string;
}

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

    const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
    const prefixCls = `${globalPrefixCls}-progress`;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${shape}`]: !!shape,
      [`${prefixCls}--${theme}`]: !!theme,
      [`${prefixCls}--${size}`]: hasKnownSize,
    });

    const roundInner = (
      <>
        <svg viewBox={viewBox}>
          <path
            className={`${prefixCls}__track`}
            d={path}
            strokeWidth={finalStrokeWidth}
            strokeLinecap={strokeLinecap}
          />
          <path
            className={`${prefixCls}__thumb`}
            d={path}
            strokeWidth={finalStrokeWidth}
            strokeLinecap={strokeLinecap}
            strokeDasharray={dasharray}
            strokeDashoffset={dashoffset}
          />
        </svg>
        {indicator && <div className={`${prefixCls}__text`}>{indicator}</div>}
      </>
    );

    const rectInner = (
      <div className={`${prefixCls}__outer`}>
        <div className={`${prefixCls}__track`} style={lineTrackStyle}>
          <div className={`${prefixCls}__thumb`} style={lineThumbStyle} />
        </div>
        {indicator && <div className={`${prefixCls}__text`}>{indicator}</div>}
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
