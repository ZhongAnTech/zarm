import { ChangeEvent } from 'react';

export type RadioType = 'button' | 'cell';
export type RadioShape = 'rect' | 'radius' | 'round';
export type RadioValue = number | string;

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
  shape?: RadioShape;
  disabled?: boolean;
  block?: boolean;
  value?: RadioValue;
  defaultValue?: RadioValue;
  onChange?: (value?: RadioValue) => void;
}
