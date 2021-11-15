import * as React from 'react';
import type { BaseWaterMarkProps } from './interface';

export const WATERMARK_DEFAULT_STYLES: React.CSSProperties = {
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  overflow: 'hidden',
  backgroundColor: 'transparent',
  backgroundRepeat: 'repeat',
};

export const TEXT_STYLE_DEFAULT: BaseWaterMarkProps['textStyle'] = {
  color: '#000',
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: 14,
  fontFamily: 'sans-serif',
  fontVariant: 'normal',
  textAlign: 'center',
  textBaseline: 'alphabetic',
};

export const IMAGE_STYLE_DEFAULT: BaseWaterMarkProps['imageStyle'] = {
  width: 120,
  height: 64,
};

export const MARK_STYLE_DEFAULT: BaseWaterMarkProps['markStyle'] = {
  width: 120,
  height: 64,
  rotate: -22,
  opacity: 0.15,
  gapX: 100,
  gapY: 100,
  offsetLeft: 0,
  offsetTop: 0,
};
