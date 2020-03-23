import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Keyboard from '../keyboard';
import Popup from '../popup';

export interface KeyboardPickerProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export interface KeyboardPickerState {
  visible?: boolean;
}

export default class KeyboardPicker extends PureComponent<KeyboardPickerProps, KeyboardPickerState> {
  static defaultProps = {
    prefixCls: 'za-keyboard-picker',
    visible: false,
    type: 'number',
    destroy: true,
  };

  static getDerivedStateFromProps(nextProps: KeyboardPickerProps) {
    if ('visible' in nextProps) {
      return { visible: nextProps.visible };
    }
    return null;
  }

  // static show = (props) => {
  //   ReactDOM.render(<KeyboardPicker {...props} visible />, window.zarmKeyboardPicker);
  // }

  // static hide = () => {
  //   ReactDOM.render(<KeyboardPicker visible={false} />, window.zarmKeyboardPicker);
  // }

  constructor(props: KeyboardPickerProps) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  onKeyClick = (key: string) => {
    if (['ok', 'close'].indexOf(key) > -1) {
      this.setState({ visible: false });
    }
    const { onKeyClick } = this.props;
    if (typeof onKeyClick === 'function') {
      onKeyClick(key);
    }
  };

  render() {
    const { prefixCls, className, destroy, ...others } = this.props;
    const { visible } = this.state;
    const cls = classnames(prefixCls, className);

    return (
      <Popup
        visible={visible}
        mask={false}
        destroy={destroy}
      >
        <div className={cls}>
          <Keyboard {...others} onKeyClick={this.onKeyClick} />
        </div>
      </Popup>
    );
  }
}

// if (typeof window !== 'undefined') {
//   if (!window.zarmKeyboardPicker) {
//     window.zarmKeyboardPicker = document.createElement('div');
//     document.body.appendChild(window.zarmKeyboardPicker);
//   }

//   ReactDOM.render(<KeyboardPicker visible={false} />, window.zarmKeyboardPicker);
// }
