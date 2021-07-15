import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import type { BaseCollapseItemProps } from './interface';
import { ConfigContext } from '../n-config-provider';

export interface CollapseItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'key' | 'title' | 'onChange'>,
    BaseCollapseItemProps {
  // prefixCls?: string;
}

const CollapseItem = React.forwardRef<unknown, CollapseItemProps>((props, ref) => {
  const { title, className, disabled, animated, isActive, children, onChange, ...rest } = props;

  const content = (ref as any) || React.createRef<HTMLElement>();
  const collapseItemRef = (ref as any) || React.createRef<HTMLElement>();
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-collapse-item`;
  const onClickItem = () => {
    if (disabled) return;
    typeof onChange === 'function' && onChange(isActive);
  };

  const getContentHeight = (ele) => {
    const contentChildren = [...ele.children];
    return contentChildren.reduce((res, next) => {
      res += next.offsetHeight;
      return res;
    }, 0);
  };

  const setStyle = () => {
    if (!content.current) return;
    content.current.style.height = isActive ? `${getContentHeight(content.current)}px` : '0px';
  };

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--active`]: isActive,
    [`${prefixCls}--disabled`]: disabled,
  });

  React.useEffect(() => {
    setStyle();
  });

  return (
    <div className={cls} {...rest} ref={collapseItemRef}>
      <div className={`${prefixCls}__header`} onClick={onClickItem}>
        <div className={`${prefixCls}__title`}>{title}</div>
        <div className={`${prefixCls}__arrow`} />
      </div>
      <div className={`${prefixCls}__content`} ref={content}>
        <div className={`${prefixCls}__content__inner`}>{children}</div>
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
