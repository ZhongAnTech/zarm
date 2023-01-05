import * as React from 'react';
import {createBEM} from "@zarm-design/bem";
import {cloneElement, useEffect, useRef} from "react";
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseDropdownProps } from './interface';
import DropdownItem, {DropdownItemProps, ItemChildrenWrap} from "./DropdownItem";
import {Popup} from "../index";

export type DropdownProps = React.PropsWithChildren<BaseDropdownProps & HTMLProps>;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<DropdownProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof DropdownItem;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const containerRef = React.createRef<HTMLDivElement>();
  const popupRef = React.useRef();

  const { className, children, onChange, activeKey, defaultActiveKey, ...restProps } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('dropdown', { prefixCls });

  const [selectedKey, setSelectedKey] = React.useState(defaultActiveKey);
  const navRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // 计算 navs 的 top 值
  const [top, setTop] = React.useState<number>()
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return
    if (selectedKey) {
      const rect = container.getBoundingClientRect()
      setTop(rect.bottom)
    }
  }, [selectedKey])

  const changeActive = (key: string | null) => {
    if (selectedKey === key) {
      setSelectedKey(null)
    } else {
      setSelectedKey(key)
    }
    onChange?.(key)
  }

  const items:  React.ReactElement<DropdownItemProps, typeof DropdownItem>[] = []
  const navs = React.Children.map(props.children, (child: React.ReactElement<DropdownItemProps, typeof DropdownItem>) => {
    if (React.isValidElement(child)) {
      const childProps = {
        ...child.props,
        onClick: () => {
          changeActive(child.props.itemKey as string)
        },
        active: child.props.itemKey === selectedKey,
        arrow:
          child.props.arrow === undefined ? props.arrow : child.props.arrow,
      }
      items.push(child)
      return cloneElement(child, childProps)
    }
    return child
  })

  return (
    <div
      className={bem([className])}
      {...restProps}
      ref={containerRef}
    >
      <div className={bem('trigger-list')} ref={navRef}>
        {navs}
      </div>
      <Popup
        visible={!!selectedKey}
        onMaskClick={() => changeActive(null)}
        style={{ top }}
        maskStyle={{ top }}
        direction="top"
        className={bem('popup')}
        forceRender
        ref={popupRef}
      >
        <div ref={contentRef}>
          {items.map(item => {
            const isActive = item.props.itemKey === selectedKey
            return (
              <ItemChildrenWrap
                key={item.props.itemKey}
                active={isActive}
              >
                {item.props.children}
              </ItemChildrenWrap>
            )
          })}
        </div>
      </Popup>
    </div>
  )
}) as CompoundedComponent;

Dropdown.displayName = 'Dropdown';

export default Dropdown;
