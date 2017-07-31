import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Toast from '../Toast';
import Spinner from '../Spinner';

class Loading extends PureComponent {

  render() {
    const { prefixCls, ...others } = this.props;

    return (
      <Toast prefixCls={prefixCls} {...others}>
        <Spinner className="rotate360" />
      </Toast>
    );
  }
}

Loading.propTypes = {
  prefixCls: PropTypes.string,
};

Loading.defaultProps = {
  prefixCls: 'zax-loading',
};

export default Loading;
