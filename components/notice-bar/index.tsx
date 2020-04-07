import React, { PureComponent } from 'react';
import PropsType from './PropsType';
import Message from '../message';
import Icon from '../icon';

const NOTICEBAR_SCROLL_SPEED = 30;
export interface NoticeBarProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export interface NoticeBarState {
  // paddingLeft?: number;
  duration?: number;
}

export default class NoticeBar extends PureComponent<NoticeBarProps, NoticeBarState> {
  static displayName = 'NoticeBar';

  static defaultProps = {
    prefixCls: 'za-notice-bar',
    theme: 'warning',
    icon: <Icon type="broadcast" />,
    hasArrow: false,
    closable: false,
  };

  private wrapper: HTMLDivElement | null = null;

  private content: HTMLDivElement | null = null;

  state: NoticeBarState = {};

  componentDidMount() {
    this.updateScrolling();
  }

  componentDidUpdate() {
    this.updateScrolling();
  }

  updateScrolling() {
    const wrapWidth = this.wrapper!.getBoundingClientRect().width;
    const offsetWidth = this.content!.getBoundingClientRect().width;
    if (offsetWidth > wrapWidth) {
      const duration = offsetWidth / NOTICEBAR_SCROLL_SPEED;
      this.setState({
        duration,
      });
    }
  }

  render() {
    const { prefixCls, children, ...others } = this.props;
    const { duration = 0 } = this.state;

    return (
      <Message {...others} size="lg">
        <div className={prefixCls} ref={(ele) => { this.wrapper = ele; }}>
          <div
            className={`${prefixCls}__body`}
            ref={(ele) => { this.content = ele; }}
            style={
              duration > 0 ? { animation: `notice-bar-scrolling ${duration}s linear infinite both` } : undefined
            }
          >
            {children}
          </div>
        </div>
      </Message>
    );
  }
}
