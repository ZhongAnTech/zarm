
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Mask from '../Mask';

class Loading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: props.visible || false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.setState({
        isShow: true
      });
    } else if (this.props.visible && !nextProps.visible) {
      this.setState({
        isShow: false
      });
    }
  }

  render () {
    const { visible, children, className, ...others } = this.props;

    let items = [];
    for (var i = 0; i < 12; i++) {
      items.push(<div key={i} className="ui-loading-item"></div>);
    }

    const cls = classnames({
      'ui-loading'      : true,
      'ui-loading-open' : this.state.isShow,
      [className]       : !!className,
    });

    return (
      <div {...others} className={cls}>
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