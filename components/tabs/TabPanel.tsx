import React, { PureComponent } from 'react';
import classnames from 'classnames';

export interface TabPannelProps {
  prefixCls?: string;
  className?: string;
}

export default class TabPanel extends PureComponent<TabPannelProps, any> {
  static defaultProps = {
    prefixCls: 'za-tabs',
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }

  static getDerivedStateFromProps(nextProps) {
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

    const cls = classnames(`${prefixCls}__panel__item`, className, {
      [`${prefixCls}__panel__item--active`]: selected,
    });

    return <div className={cls} role="tabpanel">{children}</div>;
  }
}
