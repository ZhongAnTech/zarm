import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import type { BaseListItemProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export type ListItemProps = BaseListItemProps &
  HTMLProps & {
    onClick?: React.MouseEventHandler<HTMLLIElement>;
  };

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
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
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('list-item', { prefixCls });

  const cls = bem([
    {
      link: !!onClick,
      inline: !!children,
      arrow: !!onClick && hasArrow,
    },
    className,
  ]);

  const prefixRender = prefix && <div className={bem('prefix')}>{prefix}</div>;
  const afterRender = after && <div className={bem('after')}>{after}</div>;
  const titleRender = title && <div className={bem('title')}>{title}</div>;
  const contentRender = children && <div className={bem('content')}>{children}</div>;
  const infoRender = info && <div className={bem('info')}>{info}</div>;
  const arrowRender = !!onClick && hasArrow && <div className={bem('arrow')} />;

  return (
    <li ref={ref} className={cls} onClick={onClick} onTouchStart={() => {}} {...restProps}>
      {prefixRender}
      <div className={bem('wrapper')}>
        <div className={bem('inner')}>
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
