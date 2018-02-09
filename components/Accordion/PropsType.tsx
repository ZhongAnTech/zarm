export default interface PropsType  {
  defaultActiveIndex?: string | number | Array<string | number>;
  onChange: (key: string) => void;
  accordion?: boolean;
  animated?: boolean;
}

export interface AccordionItemProps {
  title: string | JSX.Element;
  index: string;
  activeIndex?: Array<string | number>;
  accordion?: boolean;
  animated?: boolean;
  prefixCls?: string;
  className?: string;
  onItemChange?: (key: string) => void;
}
