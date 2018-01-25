import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Icon from '../Icon';

const NUMBER_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'close'];
const PRICE_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'close'];
const IDCARD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'x', '0', 'close'];

const stopPropagation = (e) => {
  e.stopPropagation();
  // e.nativeEvent.stopImmediatePropagation();
};

export interface KeyboardProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Keyboard extends PureComponent<KeyboardProps, {}> {

  static defaultProps = {
    prefixCls: 'za-keyboard',
    type: 'number',
  };

  private longPressTimer;

  onLongPressIn = (key) => {
    this.onKeyClick(key);
    this.longPressTimer = setTimeout(() => {
      this.longPressTimer = setInterval(() => {
        this.onKeyClick(key);
      }, 100);
    }, 800);
  }

  onLongPressOut = () => {
    clearInterval(this.longPressTimer);
  }

  onKeyClick = (key) => {
    if (key.length === 0) {
      return;
    }

    const { onKeyClick } = this.props;
    if (typeof onKeyClick === 'function') {
      onKeyClick(key);
    }
  }

  getKeys = () => {
    const { type } = this.props;
    switch (type) {
      case 'price':
        return PRICE_KEYS;

      case 'idcard':
        return IDCARD_KEYS;

      default:
        return NUMBER_KEYS;
    }
  }

  renderKey = (text, index) => {
    const { prefixCls } = this.props;

    const keyCls = classnames(`${prefixCls}-item`, {
      [`${prefixCls}-item-disabled`]: text.length === 0,
    });

    return (
      <div
        className={keyCls}
        key={+index}
        onClick={() => this.onKeyClick(text)}
      >
        {(text === 'close') ? <Icon type="keyboard" /> : text}
      </div>
    );
  }

  render() {
    const { prefixCls } = this.props;

    return (
      <div className={prefixCls} onClick={stopPropagation}>
        <div className={`${prefixCls}-keys`}>
          {this.getKeys().map(this.renderKey)}
        </div>
        <div className={`${prefixCls}-handle`}>
          <div
            className={`${prefixCls}-item`}
            onTouchStart={() => this.onLongPressIn('delete')}
            onTouchEnd={() => this.onLongPressOut()}
          >
            <Icon type="deletekey" />
          </div>
          <div className={`${prefixCls}-item ${prefixCls}-item-ok`} onClick={() => this.onKeyClick('ok')}>确定</div>
        </div>
      </div>
    );
  }
}
