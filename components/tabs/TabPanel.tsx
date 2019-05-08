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
    console.log('TabPanel',props)
    this.state = {
      selected: props.selected || props.defaultSelected,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('selected' in nextProps) {
      this.setState({
        selected: !!nextProps.selected,
      });
    }
  }

  render() {
    const { prefixCls, className, children } = this.props;
    const cls = classnames(`${prefixCls}__panel__item`, className, {
      [`${prefixCls}__panel__item--active`]: !!this.state.selected,
    });
    return <div className={cls} role="tabpanel">{children}</div>;
  }
}
