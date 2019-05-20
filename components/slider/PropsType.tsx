import { ReactNode } from 'react';

export interface SliderMarks {
  [key: number]: ReactNode;
}

export default interface PropsType {
  value?: number;
  defaultValue?: number;
  step: number;
  min: number;
  max: number;
  disabled?: boolean;
  showMark?: boolean;
  vertical?: boolean;
  marks?: SliderMarks;
  onChange?: (value: number) => void;
}
