import React, { PureComponent } from 'react';
import PropsType from './PropsType';
import Message from '../message';
import Icon from '../icon';

export interface MessageProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class NoticeBar extends PureComponent<MessageProps, any> {
  static defaultProps = {
    prefixCls: 'za-noticebar',
    theme: 'warning',
    icon: <Icon type="broadcast" />,
    hasArrow: false,
    hasClosable: false,
    autoscroll: false,
  };

  private wrapper;
  private content;
  private moveInterval;

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
    };
  }

  componentDidMount() {
    const { autoscroll } = this.props;
    if (!autoscroll) {
      return;
    }

    const distance = this.wrapper.offsetWidth - this.content.offsetWidth;
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
    const { prefixCls, children, autoscroll, ...others } = this.props;

    return (
      <Message {...others} size="lg">
        <div className={prefixCls} ref={(ele) => { this.wrapper = ele; }}>
          <div
            className={`${prefixCls}-body`}
            ref={(ele) => { this.content = ele; }}
            style={{ left: this.state.offset }}
          >
            {children}
          </div>
        </div>
      </Message>
    );
  }
}
