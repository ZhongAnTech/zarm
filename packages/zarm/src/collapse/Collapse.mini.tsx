import React from 'react';
import Collapse from './BaseCollapse';
import CollapseItem from './CollapseItem.mini';
import { BaseCollapseProps } from './interface';

export type CollapseProps = BaseCollapseProps & React.PropsWithChildren;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CollapseProps & React.RefAttributes<HTMLElement>> {
  Item: typeof CollapseItem;
}

export default Collapse as CompoundedComponent;
