import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Icon from '../icon';

const NUMBER_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'close'];
const PRICE_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'close'];
const IDCARD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'x', '0', 'close'];

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

  onLongPressIn = (key: string) => {
    this.onKeyClick(key);
    this.longPressTimer = setTimeout(() => {
      this.longPressTimer = setInterval(() => {
        this.onKeyClick(key);
      }, 100);
    }, 800);
  };

  onLongPressOut = (e) => {
    e.preventDefault();
    clearInterval(this.longPressTimer);
  };

  onKeyClick = (key: string) => {
    if (key.length === 0) {
      return;
    }

    const { onKeyClick } = this.props;
    if (typeof onKeyClick === 'function') {
      onKeyClick(key);
    }
  };

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
  };

  renderKey = (text: string, index: number) => {
    const { prefixCls } = this.props;

    const keyCls = classnames(`${prefixCls}__item`, {
      [`${prefixCls}__item--disabled`]: text.length === 0,
    });

    return (
      <div
        className={keyCls}
        key={+index}
        onClick={() => this.onKeyClick(text)}
      >
        {(text === 'close') ? <Icon type="keyboard" size="lg" /> : text}
      </div>
    );
  };

  render() {
    const { prefixCls, locale } = this.props;
    return (
      <div className={prefixCls}>
        <div className={`${prefixCls}__keys`}>
          {this.getKeys().map(this.renderKey)}
        </div>
        <div className={`${prefixCls}__handle`}>
          <div
            className={`${prefixCls}__item`}
            onTouchStart={() => this.onLongPressIn('delete')}
            onTouchEnd={this.onLongPressOut}
            onTouchCancel={this.onLongPressOut}
            onMouseDown={() => this.onLongPressIn('delete')}
            onMouseUp={this.onLongPressOut}
          >
            <Icon type="deletekey" size="lg" />
          </div>
          <div className={`${prefixCls}__item ${prefixCls}__item--ok`} onClick={() => this.onKeyClick('ok')}>
            {locale!.okText}
          </div>
        </div>
      </div>
    );
  }
}
