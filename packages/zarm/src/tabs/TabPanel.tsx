import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../config-provider';
import type { BaseTabPanelProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export type TabPanelProps = BaseTabPanelProps & HTMLProps;

const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => {
  const { className, selected, children, style } = props;
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('tabs__panel', { prefixCls });

  const cls = bem([{
    active: selected,
  }, className]);

  return (
    <div ref={ref} className={cls} style={style} role="tabpanel">
      {children}
    </div>
  );
});

TabPanel.displayName = 'TabPanel';

TabPanel.defaultProps = {};

export default TabPanel;
