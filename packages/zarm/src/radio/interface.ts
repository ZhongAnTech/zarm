import type { ButtonSize } from '../button/interface';

export type RadioType = 'button' | 'list';
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
  shape?: RadioShape;
  disabled?: boolean;
  block?: boolean;
  compact?: boolean;
  ghost?: boolean;
  value?: RadioValue;
  defaultValue?: RadioValue;
  buttonSize?: RadioSize;
  onChange?: (value: RadioValue) => void;
}
