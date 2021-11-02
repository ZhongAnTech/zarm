import * as React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import type { BaseTabPanelProps } from './interface';

export interface TabPanelProps extends BaseTabPanelProps {
  className?: string;
}

const TabPanel = React.forwardRef<unknown, TabPanelProps>((props, ref) => {
  const { className, selected, children } = props;

  const panelRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-tabs__panel`;

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--active`]: selected,
  });

  return (
    <div className={cls} role="tabpanel" ref={panelRef}>
      {children}
    </div>
  );
});

TabPanel.displayName = 'TabPanel';

TabPanel.defaultProps = {};

export default TabPanel;
