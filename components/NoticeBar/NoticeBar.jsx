import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Message from '../Message';
import Icon from '../Icon';

class NoticeBar extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
    };
    this.moveInterval = null;
  }

  componentDidMount() {
    const { autoscroll } = this.props;
    if (!autoscroll) return;

    const distance = this.wrapper.offsetWidth - this.content.offsetWidth;
    if (distance > 0) return;

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
          <div className={`${prefixCls}-body`} ref={(ele) => { this.content = ele; }} style={{ left: this.state.offset }}>{children}</div>
        </div>
      </Message>
    );
  }
}

NoticeBar.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: Message.propTypes.theme,
  icon: Message.propTypes.icon,
  hasArrow: Message.propTypes.hasArrow,
  hasClosable: Message.propTypes.hasClosable,
  autoscroll: PropTypes.bool,
};

NoticeBar.defaultProps = {
  prefixCls: 'za-noticebar',
  theme: 'warning',
  icon: <Icon type="broadcast" />,
  hasArrow: false,
  hasClosable: false,
  autoscroll: false,
};

export default NoticeBar;
