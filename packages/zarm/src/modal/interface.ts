import * as React from 'react';
import type { PopupProps } from '../popup';

export interface BaseModalProps extends PopupProps {
  shape?: 'radius' | 'rect';
  closable?: boolean;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  maskClosable?: boolean;
  onClose?: () => void;
}

export interface BaseModalActionProps {
  key?: string | number;
  text?: React.ReactNode;
  theme?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
  bold?: boolean;
  onClick?: () => void;
}

export interface ModalCssVars {
  '--background'?: React.CSSProperties['background'];
  '--border-radius'?: React.CSSProperties['borderRadius'];
  '--shadow'?: React.CSSProperties['boxShadow'];
  '--title-font-size'?: React.CSSProperties['fontSize'];
  '--title-font-weight'?: React.CSSProperties['fontWeight'];
  '--title-text-color'?: React.CSSProperties['color'];
  '--close-size'?: React.CSSProperties['fontSize'];
  '--close-color'?: React.CSSProperties['color'];
  '--close-active-color'?: React.CSSProperties['color'];
  '--body-font-size'?: React.CSSProperties['fontSize'];
  '--body-text-color'?: React.CSSProperties['color'];
  '--body-padding'?: React.CSSProperties['padding'];
  '--button-height'?: React.CSSProperties['height'];
  '--button-font-size'?: React.CSSProperties['fontSize'];
  '--button-font-weight'?: React.CSSProperties['fontWeight'];
  '--button-text-color'?: React.CSSProperties['color'];
  '--button-background'?: React.CSSProperties['background'];
  '--button-active-background'?: React.CSSProperties['background'];
  '--button-disabled-opacity'?: React.CSSProperties['opacity'];
}