import { createBEM } from '@zarm-design/bem';
import includes from 'lodash/includes';
import React, { Children, ReactElement } from 'react';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseCollapseProps } from './interface';
import useCollpse from './useCollapse';

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

  const [value, setValue] = useCollpse({
    multiple,
    value: activeKey,
    defaultValue: defaultActiveKey,
    onChange,
  });

  const { prefixCls } = React.useContext(ConfigContext);

  const bem = createBEM('collapse', { prefixCls });

  const cls = bem([{ animated }, className]);

  const items = Children.map(children, (ele: ReactElement<any>) => {
    const { key } = ele;
    const { disabled, onChange: itemOnChange } = ele.props;
    const actived = Array.isArray(value) ? includes(value, key) : Number(value) === Number(key);
    return React.cloneElement(ele, {
      // ...ele,
      isActive: actived,
      onChange: (active) => {
        !disabled && itemOnChange?.(active);
        setValue(key);
      },
    });
  });

  return (
    <div className={cls} ref={collapseRef} {...rest}>
      {items}
    </div>
  );
});

Collapse.displayName = 'Collapse';

Collapse.defaultProps = {
  multiple: false,
  animated: false,
};

export default Collapse;
