import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import type { BasePanelProps } from './interface';

export type HTMLDivProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export interface PanelProps extends HTMLDivProps, BasePanelProps {
  prefixCls?: string;
}

const Panel = React.forwardRef<unknown, PanelProps>((props, ref) => {
  const { prefixCls, className, title, more, children, ...restProps } = props;
  const cls = classnames(`${prefixCls}`, className);
  const panelRef = (ref as any) || React.createRef<HTMLElement>();
  return (
    <div {...restProps} className={cls} ref={panelRef}>
      <div className={`${prefixCls}__header`}>
        {title && <div className={`${prefixCls}__header__title`}>{title}</div>}
        {more && <div className={`${prefixCls}__header__more`}>{more}</div>}
      </div>
      <div className={`${prefixCls}__body`}>{children}</div>
    </div>
  );
});

Panel.displayName = 'Panel';

Panel.defaultProps = {
  prefixCls: 'za-panel',
};

export default Panel;
