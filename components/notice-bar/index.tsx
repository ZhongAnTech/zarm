import React, { PureComponent } from 'react';
import PropsType from './PropsType';
import Message from '../message';
import Icon from '../icon';

const NOTICEBAR_SCROLL_SPEED = 50;
export interface NoticeBarProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export interface NoticeBarState {
  paddingLeft?: number;
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
    scrollable: false,
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
    const { scrollable } = this.props;
    if (scrollable && offsetWidth > wrapWidth) {
      const duration = offsetWidth / NOTICEBAR_SCROLL_SPEED;
      this.setState({
        paddingLeft: wrapWidth,
        duration,
      });
    }
  }

  render() {
    const { prefixCls, children, scrollable, ...others } = this.props;
    const { duration = 0, paddingLeft = 0 } = this.state;

    return (
      <Message {...others} size="lg">
        <div className={prefixCls} ref={(ele) => { this.wrapper = ele; }}>
          <div
            className={`${prefixCls}__body`}
            ref={(ele) => { this.content = ele; }}
            style={{
              animation: `notice-bar-scrolling ${duration}s linear infinite both`,
              paddingLeft,
            }}
          >
            {children}
          </div>
        </div>
      </Message>
    );
  }
}
