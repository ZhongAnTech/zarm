import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../config-provider';
import type { BaseDropdownItemProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export type DropdownItemProps = BaseDropdownItemProps &
  HTMLProps & {
    onClick?: React.MouseEventHandler<HTMLLIElement>;
  };

const DropdownItem = React.forwardRef<HTMLLIElement, DropdownItemProps>((props, ref) => {
  const {
    className,
    title,
    onClick,
    arrow,
    children,
    ...restProps
  } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('list-item', { prefixCls });

  const cls = bem([
    {
      inline: !!children,
      arrow: true,
    },
    className,
  ]);

  const contentRender = children && <div className={bem('content')}>{children}</div>;
  const arrowRender = !!onClick && arrow && <div className={bem('arrow')} />;

  return (
    <li ref={ref} className={cls} onClick={onClick} onTouchStart={() => {}} {...restProps}>
      <div className={bem('wrapper')}>
        <div className={bem('inner')}>
          {contentRender}
          {arrowRender}
        </div>
      </div>
    </li>
  );
});

DropdownItem.displayName = 'DropdownItem';

DropdownItem.defaultProps = {
};

export default DropdownItem;
