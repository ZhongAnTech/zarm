import React, { PureComponent } from 'react';
import type { TouchEvent, MouseEvent } from 'react';
import classnames from 'classnames';
import type PropsType from './PropsType';
import Icon from '../icon';

type KeyType = Exclude<PropsType['type'], undefined>;

const KEYS: { [type in KeyType]: readonly string[] } = {
  number: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'close'],
  price: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'close'],
  idcard: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', '0', 'close'],
};

export interface KeyboardProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Keyboard extends PureComponent<KeyboardProps, {}> {
  static defaultProps: KeyboardProps = {
    prefixCls: 'za-keyboard',
    type: 'number',
  };

  private longPressTimer: ReturnType<typeof setTimeout>;

  onLongPressIn = (key: string) => {
    this.onKeyClick(key);
    this.longPressTimer = setTimeout(() => {
      this.longPressTimer = setInterval(() => {
        this.onKeyClick(key);
      }, 100);
    }, 800);
  };

  onLongPressOut = (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
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

  getKeys = (): ReadonlyArray<string> => {
    const { type } = this.props;
    return type ? KEYS[type] : KEYS.number;
  };

  renderKey = (text: string, index: number) => {
    const { prefixCls } = this.props;

    const keyCls = classnames(`${prefixCls}__item`, {
      [`${prefixCls}__item--disabled`]: text.length === 0,
    });

    return (
      <div className={keyCls} key={+index} onClick={() => this.onKeyClick(text)}>
        {text === 'close' ? <Icon type="keyboard" size="lg" /> : text}
      </div>
    );
  };

  render() {
    const { prefixCls, className, locale } = this.props;
    const cls = classnames(prefixCls, className);

    return (
      <div className={cls}>
        <div className={`${prefixCls}__keys`}>{this.getKeys().map(this.renderKey)}</div>
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
          <div
            className={`${prefixCls}__item ${prefixCls}__item--ok`}
            onClick={() => this.onKeyClick('ok')}
          >
            {locale!.okText}
          </div>
        </div>
      </div>
    );
  }
}
