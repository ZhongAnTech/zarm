import { createBEM } from '@zarm-design/bem';
import { useControllableValue } from 'ahooks';
import includes from 'lodash/includes';
import React, { Children, useCallback } from 'react';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import CollapseContext from './context';
import type { BaseCollapseProps, CollapseItemKey } from './interface';

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

function useCollapseItem(children) {
  return Children.map(children, (ele) => {
    const { key } = ele;
    return React.cloneElement(ele, {
      value: key,
    });
  });
}

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

  const collapseRef = (ref as any) || React.createRef<HTMLElement>();

  const [value, setValue] = useControllableValue(props, {
    defaultValue: multiple && defaultActiveKey ? [].concat(defaultActiveKey) : defaultActiveKey,
    defaultValuePropName: 'defaultActiveKey',
    valuePropName: 'activeKey',
  });

  console.log(value);

  const { prefixCls } = React.useContext(ConfigContext);

  const bem = createBEM('collapse', { prefixCls });

  const toggleItem = (itemValue, isActive) => {
    let newValue = [];
    if (multiple) {
      if (!isActive) {
        newValue = (value as CollapseItemKey[])?.filter((activeItem) => activeItem !== itemValue);
      } else {
        newValue = [...(value as CollapseItemKey[]), itemValue];
      }
    } else {
      newValue = itemValue === value ? '' : itemValue;
    }

    setValue(newValue);
  };

  const isActive = useCallback(
    (key) => {
      const actived = multiple
        ? includes((value as CollapseItemKey[]) || [], key!)
        : (value as CollapseItemKey) === key;
      return actived;
    },
    [value, multiple],
  );

  const cls = bem([{ animated }, className]);
  const items = useCollapseItem(children);

  return (
    <CollapseContext.Provider
      value={{
        isActive,
        toggleItem,
      }}
    >
      <div className={cls} ref={collapseRef} {...rest}>
        {items}
      </div>
    </CollapseContext.Provider>
  );
});

Collapse.displayName = 'Collapse';

Collapse.defaultProps = {
  multiple: false,
  animated: false,
};

export default Collapse;
