import { CSSProperties } from 'react';

export default interface PropsType {
  theme?: 'primary' | 'success' | 'warning' | 'error';
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: 'normal'|'small';
  onChange?: (checked: boolean) => void;
  style?: CSSProperties;
}
