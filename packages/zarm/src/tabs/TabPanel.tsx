import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseTabPanelProps } from './interface';

export type TabPanelProps = BaseTabPanelProps & HTMLProps & { isActive: boolean };

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => {
  const { className, isActive, children, style } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('tabs__panel', { prefixCls });

  const cls = bem([
    {
      active: isActive,
    },
    className,
  ]);

  return (
    <div ref={ref} className={cls} style={style} role="tabpanel">
      {children}
    </div>
  );
});

TabPanel.displayName = 'TabPanel';

TabPanel.defaultProps = {};

export default TabPanel;
