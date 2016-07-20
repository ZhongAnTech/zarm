
import React, { Component, PropTypes } from 'react';
import Mask from '../Mask';

class Loading extends Component {
  render () {
    const { visible, children, ...others } = this.props;

    let items = [];
    for (var i = 0; i < 12; i++) {
      items.push(<div key={i} className="ui-loading-item"></div>);
    }

    return (
      <div {...others} className="ui-loading" style={{display: (visible) ? 'flex' : 'none'}}>
        <div className="ui-loading-container">
          <div className="ui-loading-items">
            {items}
          </div>
        </div>
        <Mask visible={visible} type="transparent" />
      </div>
    )
  }
}

Loading.propTypes = {
  visible     : PropTypes.bool,
};

Loading.defaultProps = {
  visible     : false,
};

export default Loading;