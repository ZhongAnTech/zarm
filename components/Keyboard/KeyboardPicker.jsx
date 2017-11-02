import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Keyboard from './Keyboard';
import Popup from '../Popup';

class KeyboardPicker extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.open();
    } else {
      this.close();
    }
  }

  onKeyClick = (key) => {
    if (['ok', 'close'].indexOf(key) > -1) {
      this.close();
      return;
    }
    const { onKeyClick } = this.props;
    typeof onKeyClick === 'function' && onKeyClick(key);
  }

  open = () => {
    this.setState({ visible: true });
  }

  close = () => {
    this.setState({ visible: false });
  }

  render() {
    const { prefixCls, onKeyClick, type, ...others } = this.props;
    return (
      <Popup
        {...others}
        visible={this.state.visible}
        mask={false}
        direction="bottom">
        <Keyboard type={type} onKeyClick={this.onKeyClick} />
      </Popup>
    );
  }
}

KeyboardPicker.propTypes = {
  prefixCls: PropTypes.string,  // eslint-disable-line
  className: PropTypes.string,  // eslint-disable-line
  type: PropTypes.oneOf(['number', 'price', 'idcard']),
  onKeyClick: PropTypes.func,
};

KeyboardPicker.defaultProps = {
  prefixCls: 'za-keyboard',
  type: 'number',
};

export default KeyboardPicker;
