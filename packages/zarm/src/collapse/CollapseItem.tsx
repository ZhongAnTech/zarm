import { createBEM } from '@zarm-design/bem';
import { ArrowDown } from '@zarm-design/icons';
import React, { HTMLAttributes } from 'react';
import { ConfigContext } from '../config-provider';
import { useSafeLayoutEffect } from '../utils/hooks';
import mergeDefaultProps from '../utils/mergeDefaultProps';
import type { BaseCollapseItemProps } from './interface';

export type CollapseItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'key' | 'title' | 'onChange'> &
  BaseCollapseItemProps;

const CollapseItem = React.forwardRef<unknown, CollapseItemProps>((props, ref) => {
  props = mergeDefaultProps(defaultProps, props);
  const { title, className, disabled, animated, isActive, children, onChange, ...rest } = props;

  const contentRef = React.useRef<HTMLDivElement>(null);
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('collapse-item', { prefixCls });

  const onClickItem = () => {
    if (disabled) return;
    typeof onChange === 'function' && onChange(isActive!);
  };

  const setStyle = React.useCallback(() => {
    if (!contentRef.current) return;
    contentRef.current.style.height = isActive ? `${contentRef.current.scrollHeight}px` : '0px';
  }, [children, isActive]);

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
    <div className={cls} {...rest} ref={ref as React.Ref<HTMLDivElement>}>
      <div className={bem('header')} onClick={onClickItem}>
        <div className={bem('title')}>{title}</div>
        <ArrowDown className={bem('arrow')} />
      </div>
      <div className={bem('content')} ref={contentRef}>
        <div className={bem('content__inner')}>{children}</div>
      </div>
    </div>
  );
});

CollapseItem.displayName = 'CollapseItem';

const defaultProps: Partial<CollapseItemProps> = {
  animated: false,
  disabled: false,
};

export default CollapseItem;
