export interface BaseAccordionProps  {
  activeIndex?: string | number | Array<string | number>;
  defaultActiveIndex?: string | number | Array<string | number>;
  onChange: (key: number) => void;
  accordion?: boolean;
  animated?: boolean;
}

export interface BaseAccordionItemProps {
  title: string | JSX.Element;
  index: string;
  activeIndex?: Array<string | number>;
  accordion?: boolean;
  animated?: boolean;
  onItemChange?: (key: string) => void;
}
