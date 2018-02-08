export default interface PropsType  {
  defaultActiveKey?: string | Array<string>;
  onChange?: () => void;
  accordion?: boolean;
}

export interface AccordionItemProps {
  title: string | JSX.Element;
  index: string;
  activeKey?: Array<string>;
  accordion?: boolean;
  prefixCls?: string;
  className?: string;
  onItemChange?: (key: string) => void;
}
