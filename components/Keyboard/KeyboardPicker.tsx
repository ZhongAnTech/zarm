import React, { PureComponent } from 'react';
import PropsType from './PropsType';
import Keyboard from './Keyboard';
import Popup from '../Popup';

export interface KeyboardProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class KeyboardPicker extends PureComponent<KeyboardProps, any> {

  static defaultProps = {
    prefixCls: 'za-keyboard',
    type: 'number',
  };

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
    if (typeof onKeyClick === 'function') {
      onKeyClick(key);
    }
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
        direction="bottom"
      >
        <Keyboard type={type} onKeyClick={this.onKeyClick} />
      </Popup>
    );
  }
}
