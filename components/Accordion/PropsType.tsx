export default interface PropsType  {
  activeIndex?: string | number | Array<string | number>;
  defaultActiveIndex?: string | number | Array<string | number>;
  onChange: (key: number) => void;
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
