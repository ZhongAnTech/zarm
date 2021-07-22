import React, { HTMLAttributes, Children, cloneElement, ReactElement, useState } from 'react';
import classnames from 'classnames';
import type { CollapseActiveKey, CollapseItemKey, BaseCollapseProps } from './interface';
import CollapseItem, { CollapseItemProps } from './CollapseItem';
import { ConfigContext } from '../n-config-provider';

export type CollapseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'activeKey' | 'defaultActiveKey' | 'onChange'
> &
  BaseCollapseProps;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CollapseProps & React.RefAttributes<HTMLElement>> {
  Item: typeof CollapseItem;
}

const getActiveKey = (props) => {
  const { multiple, activeKey, defaultActiveKey, hasActiveKeys } = props;
  let value;

  if (typeof activeKey !== 'undefined') {
    value = activeKey;
  }
  if (!hasActiveKeys && typeof defaultActiveKey !== 'undefined') {
    value = defaultActiveKey;
  }
  if (value) {
    return multiple ? [].concat(value) : value;
  }

  return multiple ? [] : undefined;
};

const Collapse = React.forwardRef<unknown, CollapseProps>((props, ref) => {
  const {
    className,
    onChange,
    animated,
    activeKey,
    defaultActiveKey,
    children,
    multiple,
    ...rest
  } = props;

  const hasActiveKeys = 'activeKey' in props;
  const collapseRef = (ref as any) || React.createRef<HTMLElement>();
  const [activeKeyState, setActiveKey] = useState<CollapseActiveKey>(
    getActiveKey({ multiple, activeKey, defaultActiveKey, hasActiveKeys }),
  );

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-collapse`;

  const onItemChange = (onItemChangeProps, key) => {
    if (!key) {
      return;
    }

    let isActive;
    let newActiveKey;
    let tempActiveKey = activeKeyState;

    if (multiple) {
      newActiveKey = [];
      tempActiveKey = (tempActiveKey as CollapseItemKey[]) || [];

      if (tempActiveKey.includes(key)) {
        newActiveKey = tempActiveKey.filter((i) => i !== key);
      } else {
        newActiveKey = [...tempActiveKey, key];
      }
      isActive = newActiveKey.includes(key);
    } else {
      tempActiveKey = tempActiveKey as CollapseItemKey;
      newActiveKey = tempActiveKey === key ? undefined : key;
      isActive = tempActiveKey === key;
    }
    if (!('activeKey' in props)) {
      setActiveKey(newActiveKey);
    }
    typeof onItemChangeProps === 'function' && onItemChangeProps(isActive);
    typeof onChange === 'function' && onChange(newActiveKey);
  };

  const renderItems = () => {
    return Children.map(children, (ele: ReactElement<CollapseItemProps>) => {
      const { disabled, onChange: itemOnChange } = ele.props;
      const { key } = ele;
      const isActive = multiple
        ? ((activeKeyState as CollapseItemKey[]) || []).includes(key!)
        : (activeKeyState as CollapseItemKey) === key;
      return cloneElement(ele, {
        animated,
        isActive,
        onChange: () => !disabled && onItemChange(itemOnChange, key),
      });
    });
  };

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--animated`]: animated,
  });

  React.useEffect(() => {
    setActiveKey(getActiveKey({ multiple, activeKey, defaultActiveKey, hasActiveKeys }));
  }, [multiple, activeKey, defaultActiveKey, hasActiveKeys]);

  return (
    <div className={cls} {...rest} ref={collapseRef}>
      {renderItems()}
    </div>
  );
}) as CompoundedComponent;

Collapse.displayName = 'Collapse';

Collapse.defaultProps = {
  multiple: false,
  animated: false,
};

export default Collapse;
