import React from 'react';
import { useSafeLayoutEffect } from '../utils/hooks';
import mergeRefs from '../utils/mergeRefs';

const getContentHeight = (ele) => {
  if (!ele) {
    return 0;
  }
  const contentChildren = [...ele?.children];
  return contentChildren.reduce((res, next) => {
    res += next.offsetHeight;
    return res;
  }, 0);
};

interface CollapseItemProps {
  defaultExpanded: boolean;
  onChange: (isActive: boolean) => void;
  disabled?: boolean;
}

const useCollapseItem = ({
  defaultExpanded = false,
  onChange,
  disabled = false,
}: CollapseItemProps) => {
  const collapseElRef = React.useRef<HTMLElement | null>(null);

  const getToggleProps = (): { onClick: () => void } => {
    return {
      onClick: () => {
        !disabled && onChange(!defaultExpanded);
      },
    };
  };

  const setStyle = React.useCallback(() => {
    if (
      !collapseElRef.current ||
      !(typeof HTMLElement !== 'undefined' && collapseElRef.current instanceof HTMLElement)
    )
      return;
    collapseElRef.current.style.height = defaultExpanded
      ? `${getContentHeight(collapseElRef.current)}px`
      : '0px';
  }, [collapseElRef, defaultExpanded]);

  useSafeLayoutEffect(() => {
    setStyle();
  }, [setStyle]);

  const getCollapseContentProps = (): { ref: React.RefCallback<any> } => {
    return {
      ref: mergeRefs([collapseElRef]),
    };
  };

  return {
    getToggleProps,
    getCollapseContentProps,
  };
};

export default useCollapseItem;
