import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropsType from './PropsType';
import Keyboard from '../Keyboard';
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

  static show = (options) => {
    KeyboardPicker.show(options);
  }

  componentDidMount() {
    if (!window.zarmKeyboardPicker) {
      window.zarmKeyboardPicker = document.createElement('div');
      document.body.appendChild(window.zarmKeyboardPicker);
    }
    this.show(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.show(nextProps);
  }

  show = (props) => {
    const { visible, type } = props;

    ReactDOM.render(
      <Popup
        visible={visible}
        mask={false}
        direction="bottom"
      >
        <Keyboard type={type} onKeyClick={this.onKeyClick} />
      </Popup>
      , window.zarmKeyboardPicker);
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

  close = () => {
    this.setState({ visible: false });
  }

  render() {
    return null;
  }
}
