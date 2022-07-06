import { ChangeEvent } from 'react';
import { ButtonSize } from '../button/PropsType';

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
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
  onChange?: (value?: RadioValue) => void;
}
