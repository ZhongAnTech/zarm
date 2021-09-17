import * as React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import type { BaseListItemProps } from './interface';

export type ListItemProps = BaseListItemProps &
  Omit<React.HTMLAttributes<HTMLLIElement>, 'title' | 'prefix'>;

const ListItem = React.forwardRef<unknown, ListItemProps>((props, ref) => {
  const {
    className,
    prefix,
    after,
    title,
    info,
    children,
    onClick,
    hasArrow,
    ...restProps
  } = props;

  const compRef = (ref as any) || React.createRef<HTMLLIElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-list-item`;
  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--link`]: !!onClick,
    [`${prefixCls}--inline`]: !!children,
    [`${prefixCls}--arrow`]: !!onClick && hasArrow,
  });
  const prefixRender = prefix && <div className={`${prefixCls}__prefix`}>{prefix}</div>;
  const afterRender = after && <div className={`${prefixCls}__after`}>{after}</div>;
  const titleRender = title && <div className={`${prefixCls}__title`}>{title}</div>;
  const contentRender = children && <div className={`${prefixCls}__content`}>{children}</div>;
  const infoRender = info && <div className={`${prefixCls}__info`}>{info}</div>;
  const arrowRender = !!onClick && hasArrow && <div className={`${prefixCls}__arrow`} />;

  return (
    <li ref={compRef} className={cls} onClick={onClick} onTouchStart={() => {}} {...restProps}>
      {prefixRender}
      <div className={`${prefixCls}__wrapper`}>
        <div className={`${prefixCls}__inner`}>
          {titleRender}
          {contentRender}
          {afterRender}
          {arrowRender}
        </div>
        {infoRender}
      </div>
    </li>
  );
});

ListItem.displayName = 'ListItem';

ListItem.defaultProps = {
  hasArrow: true,
};

export default ListItem;
