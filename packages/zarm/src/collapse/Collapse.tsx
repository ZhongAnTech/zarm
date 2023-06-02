import React from 'react';
import type { HTMLProps } from '../utils/utilityTypes';
import Collapse from './BaseCollapse';
import CollapseItem from './CollapseItem';
import { BaseCollapseProps } from './interface';

export interface CollapseCssVars {
  '--border-color'?: React.CSSProperties['color'];
  '--arrow-color'?: React.CSSProperties['color'];
  '--arrow-size'?: React.CSSProperties['width'];
  '--arrow-width'?: React.CSSProperties['width'];
  '--arrow-disabled-color'?: React.CSSProperties['color'];
  '--header-height'?: React.CSSProperties['height'];
  '--header-padding-horizontal'?: React.CSSProperties['left'];
  '--header-padding-vertical'?: React.CSSProperties['top'];
  '--header-disable-color'?: React.CSSProperties['color'];
  '--content-color'?: React.CSSProperties['color'];
  '--content-padding-vertical'?: React.CSSProperties['top'];
  '--content-padding-horizontal'?: React.CSSProperties['left'];
}

export type CollapseProps = BaseCollapseProps & React.PropsWithChildren<HTMLProps<CollapseCssVars>>;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CollapseProps & React.RefAttributes<HTMLElement>> {
  Item: typeof CollapseItem;
}

export default Collapse as CompoundedComponent;
