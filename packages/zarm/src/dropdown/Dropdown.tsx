import * as React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseDropdownProps, BaseDropdownItemProps } from './interface';
import {TabPanelProps} from "../tabs";
import TabPanel from "../tabs/TabPanel";
import DropdownItem, {DropdownItemProps} from "./DropdownItem";

export type DropdownProps = React.PropsWithChildren<BaseDropdownProps & HTMLProps>;

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const { className, children, onChange, activeKey, defaultActiveKey, ...restProps } = props;
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-dropdown`;

  const onTriggerClick = (trigger: React.ReactElement<TabPanelProps, typeof TabPanel>, index: number) => {
    onChange(index);
  };

  const renderTrigger = (trigger: React.ReactElement<DropdownItemProps, typeof TabPanel>, index: number) => {
    const itemCls = classnames(`${prefixCls}__trigger`, trigger.props.className, {
    });

    return (
      <li role="tab" key={+index} className={itemCls} onClick={() => onTriggerClick(trigger, index)}>
        {trigger.props.title}
      </li>
    );
  };

  const triggersRender = React.Children.map(children, renderTrigger);

  const contentRender = React.Children.map(
    children,
    (item: React.ReactElement<DropdownItemProps, typeof DropdownItem>, index: number) => (
      <DropdownItem {...item.props} />
    ),
  );

  return (
    <div ref={ref}>
      <div className={`${prefixCls}__header`}>
        <ul className={`${prefixCls}__trigger-list`}>
          {triggersRender}
        </ul>
      </div>
      <div className={`${prefixCls}__body`}>{contentRender}</div>
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
