import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import type { BasePanelProps } from './interface';

type HTMLDivProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export type PanelProps = HTMLDivProps & BasePanelProps;

const Panel = React.forwardRef<unknown, PanelProps>((props, ref) => {
  const { className, title, more, spacing, children, ...restProps } = props;

  const panelRef = (ref as any) || React.createRef<HTMLDivElement>();
  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-panel`;

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--spacing`]: spacing,
  });

  return (
    <div className={cls} ref={panelRef} {...restProps}>
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
  spacing: false,
};

export default Panel;
