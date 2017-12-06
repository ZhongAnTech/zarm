import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
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

  // static show = (props) => {
  //   ReactDOM.render(<KeyboardPicker {...props} visible />, window.zarmKeyboardPicker);
  // }

  // static hide = () => {
  //   ReactDOM.render(<KeyboardPicker visible={false} />, window.zarmKeyboardPicker);
  // }

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({
        visible: nextProps.visible,
      });
    }
  }

  onKeyClick = (key) => {
    if (['ok', 'close'].indexOf(key) > -1) {
      this.close();
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
    const { type, ...others } = this.props;
    const { visible } = this.state;

    return (
      <Popup
        visible={visible}
        mask={false}
        direction="bottom"
      >
        <Keyboard {...others} type={type} onKeyClick={this.onKeyClick} />
      </Popup>
    );
  }
}

// if (!window.zarmKeyboardPicker) {
//   window.zarmKeyboardPicker = document.createElement('div');
//   document.body.appendChild(window.zarmKeyboardPicker);
// }

// ReactDOM.render(<KeyboardPicker visible={false} />, window.zarmKeyboardPicker);
