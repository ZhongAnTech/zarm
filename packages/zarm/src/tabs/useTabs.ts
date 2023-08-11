import { useControllableValue } from 'ahooks';
import React, { Children } from 'react';
import { TabPanelProps } from './TabPanel';

const getChildChecked = (children: TabPanelProps['children']) => {
  let selectIndex;
  React.Children.forEach(children, (item, index) => {
    if (React.isValidElement(item) && item.props && item.props.selected) {
      selectIndex = index;
    }
  });
  return selectIndex;
};

const useTabs = (props) => {
  const [currentValue, setCurrentValue] = useControllableValue(props);

  let value = (currentValue ?? getChildChecked(props.children)) || 0;

  value = Math.min(Children.count(props.children) - 1, Math.max(0, value));
  return [value, setCurrentValue];
};

export default useTabs;
