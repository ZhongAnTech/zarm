import type { ReactNode } from 'react';

export interface SliderMarks {
  [key: number]: ReactNode;
}

export default interface BaseSliderProps {
  value?: number;
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  vertical?: boolean;
  showMark?: boolean;
  marks?: SliderMarks;
  onChange?: (value: number) => void;
}
