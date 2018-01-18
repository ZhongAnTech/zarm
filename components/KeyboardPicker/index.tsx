import React, { PureComponent, cloneElement } from 'react';
import classnames from 'classnames';
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
      this.toggle(nextProps.visible);
    }
  }

  onKeyClick = (key) => {
    if (['ok', 'close'].indexOf(key) > -1) {
      this.toggle();
    }
    const { onKeyClick } = this.props;
    if (typeof onKeyClick === 'function') {
      onKeyClick(key);
    }
  }

  // 切换显示状态
  toggle = (visible = false) => {
    this.setState({ visible });
  }

  render() {
    const { prefixCls, className, type, children, ...others } = this.props;
    const { visible } = this.state;
    const cls = classnames(`${prefixCls}-picker`, className);
    const content = children && cloneElement(children, {
      onClick: () => this.toggle(true),
    });

    return (
      <div className={cls}>
        <Popup
          visible={visible}
          mask={false}
        >
          <Keyboard {...others} type={type} onKeyClick={this.onKeyClick} />
        </Popup>
        {content}
      </div>
    );
  }
}

// if (!window.zarmKeyboardPicker) {
//   window.zarmKeyboardPicker = document.createElement('div');
//   document.body.appendChild(window.zarmKeyboardPicker);
// }

// ReactDOM.render(<KeyboardPicker visible={false} />, window.zarmKeyboardPicker);
