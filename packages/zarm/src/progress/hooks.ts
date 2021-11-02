import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, MutableRefObject } from 'react';
import type { BaseProgressProps, WeightMap } from './interface';

const strokeWeights: WeightMap = {
  lg: 10,
  md: 8,
  sm: 4,
};

export function useStrokeWidthWithBackup({
  strokeWidth,
  size,
}: Readonly<Pick<BaseProgressProps, 'strokeWidth' | 'size'>>): number {
  return useMemo(() => {
    const backup = strokeWeights[size && size in strokeWeights ? size : 'md'];
    return Math.max(1, strokeWidth || backup);
  }, [strokeWidth, size]);
}

export function useSVG({ shape }: Readonly<Pick<BaseProgressProps, 'shape'>>) {
  return useMemo(() => {
    return shape === 'semi-circle' || shape === 'circle';
  }, [shape]);
}

const baseWidth = 32;
export type UseSVGStrokeWidthParams = Pick<BaseProgressProps, 'size' | 'shape'> & {
  progressElement: MutableRefObject<HTMLDivElement | null>;
  strokeWidth: number;
  shouldUseSVG: boolean;
};
export function useSVGStrokeWidth(params: Readonly<UseSVGStrokeWidthParams>) {
  const [svgStrokeWidth, setSvgStrokeWidth] = useState(params.strokeWidth);
  useEffect(() => {
    if (params.shouldUseSVG && params.progressElement.current) {
      setSvgStrokeWidth(
        (baseWidth / params.progressElement.current.clientWidth) * params.strokeWidth,
      );
    }
  }, [params.strokeWidth, params.progressElement, params.shouldUseSVG]);

  return { svgStrokeWidth } as const;
}

export function useSizeStyle({
  size,
  shape,
}: Readonly<Pick<BaseProgressProps, 'size' | 'shape'>>): {
  sizeStyle: CSSProperties;
  hasKnownSize: boolean;
} {
  return useMemo(() => {
    const sizeStyle: CSSProperties = {};
    const hasKnownSize = !!(size && size in strokeWeights);
    if (!hasKnownSize) {
      sizeStyle.width = size;
      if (shape === 'circle') {
        sizeStyle.height = size;
      }
      if (shape === 'semi-circle') {
        if (typeof size === 'number') {
          sizeStyle.height = `${size / 2}px`;
        } else if (typeof size === 'string') {
          sizeStyle.height = size.replace(/^(\d+)(.+)$/, (...$) => parseFloat($[1]) / 2 + $[2]);
        }
      }
    }
    return { sizeStyle, hasKnownSize } as const;
  }, [size, shape]);
}

const diameter = 32;
const radius = diameter / 2;
export function useRoundSVGAttributes({
  shape,
  strokeShape,
  finalStrokeWidth,
  percent,
}: Readonly<
  Pick<BaseProgressProps, 'shape' | 'strokeShape' | 'percent'> & { finalStrokeWidth: number }
>) {
  return useMemo(() => {
    const extendRadius = radius + finalStrokeWidth / 2;
    const strokeLinecap = strokeShape === 'round' ? 'round' : 'butt';

    const viewBox =
      shape === 'circle'
        ? `0 0 ${diameter + finalStrokeWidth} ${diameter + finalStrokeWidth}`
        : `0 0 ${diameter + finalStrokeWidth} ${(diameter + finalStrokeWidth) / 2}`;

    const path =
      shape === 'circle'
        ? `
    M${extendRadius}, ${extendRadius}
    m0 ${-radius}
    a${radius} ${radius} 0 1 1 0 ${diameter}
    a${radius} ${radius} 0 1 1 0 ${-diameter}`
        : `
    M${extendRadius}, ${extendRadius}
    m${-radius} 0
    a${radius} ${radius} 0 0 1 ${diameter} 0`;

    const dasharray = shape === 'circle' ? Math.PI * diameter : (Math.PI * diameter) / 2;
    const dashoffset = (dasharray * (100 - percent!)) / 100;

    return { path, dasharray, strokeLinecap, viewBox, dashoffset } as const;
  }, [shape, strokeShape, finalStrokeWidth, percent]);
}

export function useRectStyles({
  strokeWidthWithBackup,
  finalStrokeWidth,
  strokeShape,
  percent,
}: Readonly<
  Pick<BaseProgressProps, 'strokeShape' | 'percent'> & {
    finalStrokeWidth: number;
    strokeWidthWithBackup: number;
  }
>) {
  return useMemo(() => {
    const borderRadius = strokeShape === 'round' ? `${strokeWidthWithBackup}px` : '0';
    const lineTrackStyle = { height: `${finalStrokeWidth}`, borderRadius };
    const lineThumbStyle = { width: `${percent}%`, height: `${finalStrokeWidth}px`, borderRadius };

    return { lineThumbStyle, lineTrackStyle } as const;
  }, [strokeWidthWithBackup, finalStrokeWidth, strokeShape, percent]);
}

export function useIndicator({
  text,
  percent,
  children,
}: Readonly<Pick<React.PropsWithChildren<BaseProgressProps>, 'text' | 'percent' | 'children'>>) {
  return useMemo(() => {
    const formattedPercent = text ? text(percent || 0) : null;
    const indicator = children || formattedPercent;
    return indicator;
  }, [text, percent, children]);
}
