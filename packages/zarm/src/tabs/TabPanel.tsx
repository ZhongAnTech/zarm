import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import TabsContext from './context';
import type { BaseTabPanelProps } from './interface';

export type TabPanelProps = BaseTabPanelProps & HTMLProps;

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => {
  const { className, value, children, style } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('tabs__panel', { prefixCls });

  const { current } = React.useContext(TabsContext);

  const cls = bem([
    {
      active: current === value,
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
