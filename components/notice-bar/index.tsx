import React, { PureComponent } from 'react';
import PropsType from './PropsType';
import Message from '../message';
import Icon from '../icon';

export interface NoticeBarProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export interface NoticeBarState {
  offset: number;
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

  private moveInterval?: number;

  state: NoticeBarState = {
    offset: 0,
  };

  componentDidMount() {
    const { scrollable } = this.props;
    if (!scrollable) {
      return;
    }

    const distance = this.wrapper!.offsetWidth - this.content!.offsetWidth;
    if (distance > 0) {
      return;
    }

    let delay = 1000;
    this.moveInterval = setInterval(() => {
      let { offset } = this.state;
      if ((offset < distance || offset >= 0) && delay > 0) {
        delay -= 50;
        return;
      }

      delay = 1000;
      offset = (offset < distance)
        ? 0
        : (offset - 1);

      this.setState({ offset });
    }, 50);
  }

  componentWillUnmount() {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }
  }

  render() {
    const { prefixCls, children, scrollable, ...others } = this.props;
    const { offset } = this.state;

    return (
      <Message {...others} size="lg">
        <div className={prefixCls} ref={(ele) => { this.wrapper = ele; }}>
          <div
            className={`${prefixCls}__body`}
            ref={(ele) => { this.content = ele; }}
            style={{
              left: offset,
            }}
          >
            {children}
          </div>
        </div>
      </Message>
    );
  }
}
