import React, { PureComponent, cloneElement } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import { TooltipProps } from './PropsType';
// import Events from '../utils/events';

export default class Tooltip extends PureComponent<TooltipProps, any> {

  private child;
  private tooltip;

  static defaultProps = {
    prefixCls: 'za-tooltip',
    visible: false,
  }

  componentDidMount() {
    if (!window.zarmTooltip) {
      window.zarmTooltip = document.createElement('div');
      document.body.appendChild(window.zarmTooltip);
    }
    this.show(this.props);
    // Events.on(window, 'resize', this.resize);
  }

  componentWillReceiveProps(nextProps) {
    this.show(nextProps);
  }

  show = (props) => {
    const { prefixCls, className, visible, message } = props;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}-hidden`]: !visible,
    });

    // eslint-disable-next-line
    const rect = findDOMNode(this.child).getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
    const style = {
      left: rect.left,
      top: rect.top + scrollTop,
      width: rect.width,
    };

    ReactDOM.render(
      <div className={cls} style={style} ref={(ele) => { this.tooltip = ele; }}>
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

