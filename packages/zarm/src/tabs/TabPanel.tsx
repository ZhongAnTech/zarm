import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseTabPanelProps } from './interface';

export type TabPanelProps = BaseTabPanelProps & HTMLProps;

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => {
  const { className, selected, children, style } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('tabs__panel', { prefixCls });

  const cls = bem([
    {
      active: selected,
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
