import React from 'react';

export default interface ClickOutsideProps {
  onClickOutside: (event: React.SyntheticEvent) => void;
  disabled?: boolean;
  className?: string;
  ignoredNode?: HTMLElement;
  [propName: string]: any;
}
