import { PopperPlacement, PopperTrigger } from '../popper/PropsType';

export default interface PropsType {
  visible?: boolean;
  hasArrow?: boolean;
  arrowPointAtCenter?: boolean;
  direction?: PopperPlacement;
  trigger?: PopperTrigger;
  // popperOptions?: PopperJS.PopperOptions;
  // modifiers?: PopperJS.Modifiers;
  content?: React.ReactNode;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onVisibleChange?: (visible: boolean) => void;
}
