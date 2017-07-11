import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Mask from '../Mask';

class Loading extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isShow: props.visible || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({
        isShow: true,
      });
    } else {
      this.setState({
        isShow: false,
      });
    }
  }

  render() {
    const { prefixCls, visible, className } = this.props;

    const items = [];
    for (let i = 0; i < 12; i += 1) {
      items.push(<div key={i} className={`${prefixCls}-item`} />);
    }

    const cls = classnames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-open`]: this.state.isShow,
      [className]: !!className,
    });

    return (
      <div className={cls}>
        <div className={`${prefixCls}-container`}>
          <div className={`${prefixCls}-items`}>
            {items}
          </div>
        </div>
        <Mask visible={visible} type="transparent" />
      </div>
    );
  }
}

Loading.propTypes = {
  prefixCls: PropTypes.string,
  visible: PropTypes.bool,
};

Loading.defaultProps = {
  prefixCls: 'ui-loading',
  visible: false,
};

export default Loading;
