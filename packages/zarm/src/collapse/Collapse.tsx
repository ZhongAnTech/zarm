import { createBEM } from '@zarm-design/bem';
import includes from 'lodash/includes';
import React, { Children, cloneElement, ReactElement, useState } from 'react';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import CollapseItem, { CollapseItemProps } from './CollapseItem';
import type { BaseCollapseProps, CollapseActiveKey, CollapseItemKey } from './interface';

export interface CollapseCssVars {
  '--border-color'?: React.CSSProperties['color'];
  '--arrow-color'?: React.CSSProperties['color'];
  '--arrow-size'?: React.CSSProperties['width'];
  '--arrow-width'?: React.CSSProperties['width'];
  '--arrow-disabled-color'?: React.CSSProperties['color'];
  '--header-height'?: React.CSSProperties['height'];
  '--header-padding-horizontal'?: React.CSSProperties['left'];
  '--header-padding-vertical'?: React.CSSProperties['top'];
  '--header-disable-color'?: React.CSSProperties['color'];
  '--content-color'?: React.CSSProperties['color'];
  '--content-padding-vertical'?: React.CSSProperties['top'];
  '--content-padding-horizontal'?: React.CSSProperties['left'];
}

export type CollapseProps = BaseCollapseProps & React.PropsWithChildren<HTMLProps<CollapseCssVars>>;

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

  const { prefixCls } = React.useContext(ConfigContext);

  const bem = createBEM('collapse', { prefixCls });

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

      if (includes(tempActiveKey, key)) {
        newActiveKey = tempActiveKey.filter((i) => i !== key);
      } else {
        newActiveKey = [...tempActiveKey, key];
      }
      isActive = includes(newActiveKey, key);
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
        ? includes((activeKeyState as CollapseItemKey[]) || [], key!)
        : (activeKeyState as CollapseItemKey) === key;
      return cloneElement(ele, {
        animated,
        isActive,
        onChange: () => !disabled && onItemChange(itemOnChange, key),
      });
    });
  };

  const cls = bem([{ animated }, className]);

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
