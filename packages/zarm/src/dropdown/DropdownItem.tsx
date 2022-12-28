import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../config-provider';
import type { BaseDropdownItemProps } from './interface';

export interface DropdownItemProps
  extends BaseDropdownItemProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {}

const DropdownItem = React.forwardRef<HTMLLIElement, DropdownItemProps>((props, ref) => {
  const dropdownItemRef = (ref as any) || React.createRef<HTMLDivElement>();
  const {
    className,
    title,
    arrow,
    children,
    selected,
    ...restProps
  } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('dropdown', { prefixCls });

  const cls = bem('content', [
    {
      active: selected,
    },
  ]);

  return (
    <div ref={dropdownItemRef} className={cls} {...restProps}>
      {children}
    </div>
  );
});

DropdownItem.displayName = 'DropdownItem';

DropdownItem.defaultProps = {
};

export default DropdownItem;
