import { createBEM } from '@zarm-design/bem';
import React, { HTMLAttributes } from 'react';
import { ConfigContext } from '../config-provider';
import { useSafeLayoutEffect } from '../utils/hooks';
import type { BaseCollapseItemProps } from './interface';

export type CollapseItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'key' | 'title' | 'onChange'> &
  BaseCollapseItemProps;

const CollapseItem = React.forwardRef<unknown, CollapseItemProps>((props, ref) => {
  const { title, className, disabled, animated, isActive, children, onChange, ...rest } = props;

  const content = (ref as any) || React.createRef<HTMLElement>();
  const collapseItemRef = (ref as any) || React.createRef<HTMLElement>();
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('collapse-item', { prefixCls });

  const onClickItem = () => {
    if (disabled) return;
    typeof onChange === 'function' && onChange(isActive!);
  };

  const getContentHeight = (ele) => {
    const contentChildren = [...ele.children];
    return contentChildren.reduce((res, next) => {
      res += next.offsetHeight;
      return res;
    }, 0);
  };

  const setStyle = React.useCallback(() => {
    if (!content.current) return;
    content.current.style.height = isActive ? `${getContentHeight(content.current)}px` : '0px';
  }, [content, isActive]);

  const cls = bem([
    {
      active: isActive,
      disabled,
    },
    className,
  ]);

  useSafeLayoutEffect(() => {
    setStyle();
  }, [setStyle]);

  return (
    <div className={cls} {...rest} ref={collapseItemRef}>
      <div className={bem('header')} onClick={onClickItem}>
        <div className={bem('title')}>{title}</div>
        <div className={bem('arrow')} />
      </div>
      <div className={bem('content')} ref={content}>
        <div className={bem('content__inner')}>{children}</div>
      </div>
    </div>
  );
});

CollapseItem.displayName = 'CollapseItem';

CollapseItem.defaultProps = {
  animated: false,
  disabled: false,
};

export default CollapseItem;
