import React, { HTMLAttributes, Component, Children, cloneElement, ReactElement } from 'react';
import classnames from 'classnames';
import { CollapseActiveKey, CollapseItemKey, BaseCollapseProps } from './PropsType';
import CollapseItem, { CollapseItemProps } from './CollapseItem';

export interface CollapseProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'activeKey' | 'defaultActiveKey' | 'onChange'>,
    BaseCollapseProps {
  prefixCls?: string;
}

interface CollapseStates {
  activeKey?: CollapseActiveKey;
  prevActiveKey?: CollapseActiveKey;
  animated?: boolean;
  multiple?: boolean;
}

const getActiveKey = (props: CollapseProps) => {
  const { multiple, activeKey, defaultActiveKey } = props;

  let value;

  if (typeof activeKey !== 'undefined') {
    value = activeKey;
  }

  if (!('activeKey' in props) && typeof defaultActiveKey !== 'undefined') {
    value = defaultActiveKey;
  }

  if (value) {
    return multiple ? [].concat(value) : value;
  }

  return multiple ? [] : undefined;
};

export default class Collapse extends Component<CollapseProps, CollapseStates> {
  static defaultProps: CollapseProps = {
    prefixCls: 'za-collapse',
    multiple: false,
    animated: false,
    onChange: () => {},
  };

  static Item: typeof CollapseItem;

  state: CollapseStates = {
    activeKey: getActiveKey(this.props),
  };

  static getDerivedStateFromProps(nextProps: CollapseProps, state: CollapseStates) {
    const newState: CollapseStates = {};

    if ('activeKey' in nextProps && nextProps.activeKey !== state.activeKey) {
      newState.activeKey = getActiveKey(nextProps);
    }

    if ('activeKey' in newState) {
      return newState;
    }

    return null;
  }

  onItemChange = (onItemChange, key) => {
    if (!key) {
      return;
    }

    let { activeKey } = this.state;
    const { onChange, multiple } = this.props;
    let isActive;
    let newActiveKey;

    if (multiple) {
      newActiveKey = [];
      activeKey = (activeKey as CollapseItemKey[]) || [];
      if (activeKey.indexOf(key) > -1) {
        newActiveKey = activeKey.filter((i) => i !== key);
      } else {
        newActiveKey = activeKey.slice(0);
        newActiveKey.push(key);
      }
      isActive = newActiveKey.indexOf(key) > -1;
    } else {
      activeKey = activeKey as CollapseItemKey;
      newActiveKey = activeKey === key ? undefined : key;
      isActive = activeKey === key;
    }

    if (!('activeKey' in this.props)) {
      this.setState({
        activeKey: newActiveKey,
      });
    }

    typeof onItemChange === 'function' && onItemChange(isActive);
    typeof onChange === 'function' && onChange(newActiveKey);
  };

  renderItems = () => {
    const { activeKey } = this.state;
    const { multiple, animated } = this.props;
    return Children.map(this.props.children, (ele: ReactElement<CollapseItemProps>) => {
      const { disabled, onChange } = ele.props;
      const { key } = ele;
      const isActive = multiple
        ? ((activeKey as CollapseItemKey[]) || []).indexOf(key!) > -1
        : (activeKey as CollapseItemKey) === key;

      return cloneElement(ele, {
        animated,
        isActive,
        onChange: () => !disabled && this.onItemChange(onChange, key),
      });
    });
  };

  render() {
    const {
      prefixCls,
      className,
      onChange,
      animated,
      activeKey,
      defaultActiveKey,
      ...rest
    } = this.props;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--animated`]: animated,
    });

    return (
      <div className={cls} {...rest}>
        {this.renderItems()}
      </div>
    );
  }
}
