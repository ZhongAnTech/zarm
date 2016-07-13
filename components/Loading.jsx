
import React, { Component, PropTypes } from 'react';
import Mask from './Mask';

class Loading extends Component {

  render () {
    const { visible, width, height, message, ...others } = this.props;
    const bodyStyle = {
      'position'   : 'absolute',
      'left'       : '50%',
      'top'        : '50%',
      'marginLeft' : - width / 2,
      'marginTop'  : - height / 2,
      'width'      : width,
      'height'     : height,
    };

    return visible ? (
      <div className="ui-loading" {...others}>
        <div className="ui-loading-body" style={bodyStyle}>
          <br />
          {message}
        </div>
        <Mask visible={visible} type="light" />
      </div>
    ) : null;
  }

}

Loading.propTypes = {
  visible : PropTypes.bool,
  message : PropTypes.string,
  width   : PropTypes.number,
  height  : PropTypes.number,
};

Loading.defaultProps = {
  visible : false,
  message : '加载中',
  width   : 80,
  height  : 80,
};

export default Loading;

