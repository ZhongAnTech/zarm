
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Mask from '../Mask';

class Loading extends Component {

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
    const { visible, className } = this.props;

    const items = [];
    for (let i = 0; i < 12; i += 1) {
      items.push(<div key={i} className="ui-loading-item" />);
    }

    const cls = classnames({
      'ui-loading': true,
      'ui-loading-open': this.state.isShow,
      [className]: !!className,
    });

    return (
      <div className={cls}>
        <div className="ui-loading-container">
          <div className="ui-loading-items">
            {items}
          </div>
        </div>
        <Mask visible={visible} type="transparent" />
      </div>
    );
  }
}

Loading.propTypes = {
  visible: PropTypes.bool,
};

Loading.defaultProps = {
  visible: false,
};

export default Loading;
