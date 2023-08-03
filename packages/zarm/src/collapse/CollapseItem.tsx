import { createBEM } from '@zarm-design/bem';
import React, { HTMLAttributes } from 'react';
import { ConfigContext } from '../config-provider';
import type { BaseCollapseItemProps } from './interface';
import useCollapseItem from './useCollapseItem';

export type CollapseItemProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'key' | 'title' | 'onChange' | 'children'
> &
  BaseCollapseItemProps & {
    children: React.ReactNode | (({ active }: { active: boolean }) => React.ReactNode);
  };

type CollapseItemExtraProps = CollapseItemProps & { isActive?: boolean };

const CollapseItem = React.forwardRef<unknown, CollapseItemExtraProps>((props, ref) => {
  const { title, className, disabled, children, onChange, isActive, ...rest } = props;

  const content = (ref as any) || React.createRef<HTMLElement>();
  const collapseItemRef = (ref as any) || React.createRef<HTMLElement>();
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('collapse-item', { prefixCls });

  const { getToggleProps, getCollapseContentProps } = useCollapseItem({
    defaultExpanded: isActive,
    onChange,
    disabled,
  });

  const cls = bem([
    {
      active: isActive,
      disabled,
    },
    className,
  ]);

  return (
    <div className={cls} {...rest} ref={collapseItemRef}>
      <div className={bem('header')} {...getToggleProps()}>
        <div className={bem('title')}>{title}</div>
        <div className={bem('arrow')} />
      </div>
      <div className={bem('content')} ref={content} {...getCollapseContentProps()}>
        <div className={bem('content__inner')}>
          {typeof children === 'function' ? children?.({ active: isActive }) : children}
        </div>
      </div>
    </div>
  );
});

CollapseItem.displayName = 'CollapseItem';

CollapseItem.defaultProps = {
  disabled: false,
};

export default CollapseItem;
