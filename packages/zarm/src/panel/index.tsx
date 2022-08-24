import React, { HTMLAttributes } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import type { BasePanelProps } from './interface';

type HTMLDivProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export type PanelProps = HTMLDivProps & BasePanelProps;

const Panel = React.forwardRef<unknown, PanelProps>((props, ref) => {
  const { className, title, more, spacing, children, ...restProps } = props;

  const panelRef = (ref as any) || React.createRef<HTMLDivElement>();
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('panel', { prefixCls });

  const cls = bem([{ spacing }, className]);

  return (
    <div className={cls} ref={panelRef} {...restProps}>
      <div className={bem('header')}>
        {title && <div className={bem('header__title')}>{title}</div>}
        {more && <div className={bem('header__more')}>{more}</div>}
      </div>
      <div className={bem('body')}>{children}</div>
    </div>
  );
});

Panel.displayName = 'Panel';

Panel.defaultProps = {
  spacing: false,
};

export default Panel;
