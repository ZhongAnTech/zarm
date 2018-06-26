import React, { PureComponent, cloneElement } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import PropsType from './PropsType';
// import Events from '../utils/events';

export interface TooltipProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Tooltip extends PureComponent<TooltipProps, any> {
  static defaultProps = {
    prefixCls: 'za-tooltip',
    visible: false,
  };

  private child;

  componentDidMount() {
    if (!window.zarmTooltip) {
      window.zarmTooltip = document.createElement('div');
      document.body.appendChild(window.zarmTooltip);
    }
    this.show(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.show(nextProps);
  }

  show = (props) => {
    const { prefixCls, className, visible, message } = props;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}-hidden`]: !visible,
    });

    const dom = findDOMNode(this.child) as HTMLElement;
    const rect = dom.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
    const style = {
      left: rect.left,
      top: rect.top + scrollTop,
      width: rect.width,
    };

    ReactDOM.render(
      <div className={cls} style={style}>
        <div className={`${prefixCls}-inner`}>{message}</div>
      </div>
      , window.zarmTooltip);
  }

  render() {
    const { children } = this.props;
    return cloneElement(children, {
      ref: (ele) => { this.child = ele; },
    });
  }
}
