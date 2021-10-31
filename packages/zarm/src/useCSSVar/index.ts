import React, { useCallback } from 'react';

export interface useCSSVarProps {
  elementRef?: React.RefObject<HTMLElement>;
}

export default (options?: useCSSVarProps) => {
  const { elementRef } = options || {};
  const element: HTMLElement = (elementRef && elementRef.current) || document.documentElement;

  const setCSSVar = useCallback(
    (property: string, value: string) => {
      return element.style.setProperty(property, value);
    },
    [element],
  );

  const getCSSVar = useCallback(
    (property: string) => {
      return getComputedStyle(element).getPropertyValue(property);
    },
    [element],
  );

  const removeCSSVar = useCallback(
    (property: string) => {
      return element.style.removeProperty(property);
    },
    [element],
  );

  return { getCSSVar, setCSSVar, removeCSSVar };
};
