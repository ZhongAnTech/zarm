import React, { PureComponent, ReactNode } from 'react';
import classnames from 'classnames';

export interface TabPanelProps {
  prefixCls?: string;
  className?: string;
  selected?: boolean;
  title?: ReactNode;
  disabled?: boolean;
}

interface TabPanelStates {
  selected?: boolean;
}

export default class TabPanel extends PureComponent<TabPanelProps, TabPanelStates> {
  static defaultProps: TabPanelProps = {
    prefixCls: 'za-tabs',
  };

  constructor(props: TabPanel['props']) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }

  static getDerivedStateFromProps(nextProps: TabPanel['props']) {
    if ('selected' in nextProps) {
      return {
        selected: nextProps.selected,
      };
    }
    return null;
  }

  render() {
    const { prefixCls, className, children } = this.props;
    const { selected } = this.state;
    const cls = classnames(`${prefixCls}__panel`, className, {
      [`${prefixCls}__panel--active`]: selected,
    });

    return (
      <div className={cls} role="tabpanel">
        {children}
      </div>
    );
  }
}
