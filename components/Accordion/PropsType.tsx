export interface BaseAccordionProps  {
  activeIndex?: string | number | Array<string | number>;
  defaultActiveIndex?: string | number | Array<string | number>;
  onChange: (key: number) => void;
  accordion?: boolean;
  animated?: boolean;
  open?: boolean;
}

export interface BaseAccordionItemProps {
  title: string | JSX.Element;
  index: string;
  activeIndex?: Array<string>;
  accordion?: boolean;
  animated?: boolean;
  open?: boolean;
  onItemChange?: (key: string) => void;
}
