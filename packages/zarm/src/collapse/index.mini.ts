import React from 'react';
import Collapse, { CollapseProps } from './Collapse';
import CollapseItem from './CollapseItem.mini';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CollapseProps & React.RefAttributes<HTMLElement>> {
  Item: typeof CollapseItem;
}

const CollapseWithItem = Collapse as CompoundedComponent;

CollapseWithItem.Item = CollapseItem;

export type { CollapseCssVars, CollapseProps } from './Collapse';
export type { CollapseItemProps } from './CollapseItem.mini';

export default CollapseWithItem;
