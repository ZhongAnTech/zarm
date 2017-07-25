import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Mask from '../Mask';
import Spinner from '../Spinner';

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
    const { prefixCls, className, visible, type } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-open`]: this.state.isShow,
      [className]: !!className,
    });


    // const items = [];
    // for (let i = 0; i < 12; i += 1) {
    //   items.push(<div key={i} className={`${prefixCls}-item`} />);
    // }

    return (
      <div className={cls}>
        <div className={`${prefixCls}-container`}>
          <Spinner />
          {
            // <div className={`${prefixCls}-items`}>
            //   {items}
            // </div>
          }
        </div>
        <Mask visible={visible} type="transparent" />
      </div>
    );
  }
}

Loading.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
  type: PropTypes.oneOf(['flower']),
};

Loading.defaultProps = {
  prefixCls: 'ui-loading',
  className: null,
  visible: false,
  type: null,
};

export default Loading;
