import { CSSProperties } from 'react';

export default interface PropsType {
  visible?: boolean;
  type?: 'normal' | 'transparent';
  style?: CSSProperties;
}
