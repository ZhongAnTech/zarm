import { CSSProperties } from 'react';

export default interface PropsType {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  // size?: 'normal'|'small';
  onChange?: (checked: boolean) => void;
  style?: CSSProperties;
}
