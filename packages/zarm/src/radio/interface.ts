import type { ButtonSize, ButtonShape } from '../button/interface';

export type RadioType = 'button' | 'list';
export type RadioValue = number | string;
export type RadioGroupListMarkerAlign = 'before' | 'after';

export interface BaseRadioProps {
  type?: RadioType;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: RadioValue;
  id?: string;
  listMarkerAlign?: RadioGroupListMarkerAlign;
}

export interface BaseRadioGroupProps {
  type?: RadioType;
  disabled?: boolean;
  block?: boolean;
  value?: RadioValue;
  defaultValue?: RadioValue;
  buttonShape?: ButtonShape;
  buttonSize?: ButtonSize;
  buttonCompact?: boolean;
  buttonGhost?: boolean;
  listMarkerAlign?: RadioGroupListMarkerAlign;
  onChange?: (value: RadioValue) => void;
}
