export default interface PropsType  {
  defaultActiveKey?: string | Array<string>;
  onChange: (key: string) => void;
  accordion?: boolean;
  animated?: boolean;
}

export interface AccordionItemProps {
  title: string | JSX.Element;
  index: string;
  activeKey?: Array<string>;
  accordion?: boolean;
  animated?: boolean;
  prefixCls?: string;
  className?: string;
  onItemChange?: (key: string) => void;
}
