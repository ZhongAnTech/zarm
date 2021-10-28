import React from 'react';
import { PopperPlacement, PopperTrigger } from '../popper/PropsType';

export default interface BaseTooltipProps {
  visible?: boolean;
  hasArrow?: boolean;
  arrowPointAtCenter?: boolean;
  direction?: PopperPlacement;
  trigger?: PopperTrigger;
  content?: React.ReactNode;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onVisibleChange?: (visible: boolean) => void;
}
