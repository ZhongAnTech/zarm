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
  }

  componentDidMount() {
    const distance = this.content.offsetWidth - this.wrapper.offsetWidth;
    if (distance <= 0) return;

    setInterval(() => {
      let { offset } = this.state;
      offset = (offset < -distance)
        ? 0
        : (offset - 1);

      this.setState({
        offset,
      });
    }, 50);
  }

  render() {
    const { prefixCls, children, ...others } = this.props;

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
  mode: Message.propTypes.mode,
  icon: Message.propTypes.icon,
};

NoticeBar.defaultProps = {
  prefixCls: 'za-noticebar',
  className: null,
  theme: 'warning',
  mode: null,
  icon: <Icon type="broadcast" />,
};

export default NoticeBar;
