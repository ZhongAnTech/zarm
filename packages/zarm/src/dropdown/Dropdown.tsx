import * as React from 'react';
import {createBEM} from "@zarm-design/bem";
import {cloneElement} from "react";
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseDropdownProps } from './interface';
import DropdownItem, {DropdownItemProps} from "./DropdownItem";

export type DropdownProps = React.PropsWithChildren<BaseDropdownProps & HTMLProps>;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<DropdownProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof DropdownItem;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const { className, children, onChange, activeKey, defaultActiveKey, ...restProps } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('dropdown', { prefixCls });

  const [selectedKey, setSelectedKey] = React.useState(defaultActiveKey);

  const onTriggerClick = (dropdownItem: React.ReactElement<DropdownItemProps, typeof DropdownItem>, index: number) => {
    const { itemKey } = dropdownItem.props;
    if (selectedKey === itemKey) {
      setSelectedKey('');
    } else {
      setSelectedKey(dropdownItem.props.itemKey);
    }
    onChange?.(index);
  };

  // const getSelected = (index: number, itemKey: string | number) => {
  //   if (!activeKey) {
  //     if (!defaultActiveKey && index === 0) {
  //       return true;
  //     }
  //     return defaultActiveKey === itemKey;
  //   }
  //   return activeKey === itemKey;
  // };

  const arrowRender = (isSelected: boolean) => <div className={bem('arrow', [{
    active: isSelected
  }])} />;

  const renderTrigger = (dropdownItem: React.ReactElement<DropdownItemProps, typeof DropdownItem>, index: number) => {
    const isSelected = selectedKey === dropdownItem.props.itemKey;
    return (
      <li key={index} className={bem('trigger', [
        { active: isSelected }
      ])} onClick={() => onTriggerClick(dropdownItem, index)}>
        {dropdownItem.props.title}
        {arrowRender(isSelected)}
      </li>
    );
  };

  const triggersRender = React.Children.map(children, renderTrigger);

  const contentRender = React.Children.map(
    children,
    (element: React.ReactElement<DropdownItemProps, typeof DropdownItem>, index: number) => {
      if (!React.isValidElement(element)) return null;
      const itemKey = element.props.itemKey || index;
      // let selected = getSelected(index, itemKey);
      // if (!activeKey) {
      //   selected = selectedKey === itemKey;
      //   if (!selectedKey && index === 0) {
      //     selected = true;
      //   }
      // }
      const selected = selectedKey === itemKey;
      return cloneElement(element, {
        key: index,
        title: element.props.title,
        itemKey,
        // style: element.props.style,
        selected,
      });
    }
  );

  return (
      <div ref={ref} className={bem([className])} {...restProps}>
        <ul className={bem('trigger-list')}>
          {triggersRender}
        </ul>
        {contentRender}
      </div>
  );
}) as CompoundedComponent;

Dropdown.displayName = 'Dropdown';

export default Dropdown;
