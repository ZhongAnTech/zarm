import React from 'react';
import Collapse, { CollapseProps } from './Collapse';
import CollapseItem from './CollapseItem.mini';
import useCollapseItem from './useCollapseItem';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CollapseProps & React.RefAttributes<HTMLElement>> {
  Item: typeof CollapseItem;
  useCollapseItem: typeof useCollapseItem;
}

const CollapseWithItem = Collapse as CompoundedComponent;

CollapseWithItem.Item = CollapseItem;
CollapseWithItem.useCollapseItem = useCollapseItem;

export type { CollapseCssVars, CollapseProps } from './Collapse';
export type { CollapseItemProps } from './CollapseItem.mini';

export default CollapseWithItem;
