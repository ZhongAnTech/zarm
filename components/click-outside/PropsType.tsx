import type { HTMLAttributes } from 'react';

export default interface ClickOutsideProps extends HTMLAttributes<HTMLDivElement> {
  onClickOutside?: (event: Event) => void;
  disabled?: boolean;
  className?: string;
  ignoredNode?: HTMLElement;
}
