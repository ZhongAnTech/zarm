import * as React from 'react';
import type { ButtonSize } from '../button/interface';

export type RadioType = 'button' | 'cell';
export type RadioShape = 'rect' | 'radius' | 'round';
export type RadioValue = number | string;
export type RadioSize = ButtonSize;

export interface BaseRadioProps {
  type?: RadioType;
  shape?: RadioShape;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: RadioValue;
  id?: string;
}

export interface BaseRadioGroupProps {
  type?: RadioType;
  size?: RadioSize;
  shape?: RadioShape;
  disabled?: boolean;
  block?: boolean;
  compact?: boolean;
  ghost?: boolean;
  value?: RadioValue;
  defaultValue?: RadioValue;
  onChange?: (value: RadioValue) => void;
  children?: React.ReactNode;
}
