import React, { PureComponent } from 'react';
import type { TouchEvent, MouseEvent } from 'react';
import classnames from 'classnames';
import { Keyboard as KeyboardIcon, DeleteKey as DeleteKeyIcon } from '@zarm-design/icons';
import type PropsType from './PropsType';

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

  private touchLongPressTimer: ReturnType<typeof setTimeout | typeof setInterval>;

  private mouseLongPressTimer: ReturnType<typeof setTimeout | typeof setInterval>;

  onTouchLongPressIn = (key: string) => {
    this.onKeyClick(key);
    this.touchLongPressTimer = setTimeout(() => {
      this.touchLongPressTimer = setInterval(() => {
        this.onKeyClick(key);
      }, 100);
    }, 800);
  };

  onTouchLongPressOut = (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearInterval(this.touchLongPressTimer);
  };

  onMouseLongPressIn = (key: string) => {
    this.onKeyClick(key);
    this.mouseLongPressTimer = setTimeout(() => {
      this.mouseLongPressTimer = setInterval(() => {
        this.onKeyClick(key);
      }, 100);
    }, 800);
  };

  onMouseLongPressOut = (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearInterval(this.mouseLongPressTimer);
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
        {text === 'close' ? <KeyboardIcon size="lg" /> : text}
      </div>
    );
  };

  render() {
    const { prefixCls, className, locale } = this.props;
    const cls = classnames(prefixCls, className);

    return (
      <div className={cls} onClick={(event) => event.stopPropagation()}>
        <div className={`${prefixCls}__keys`}>{this.getKeys().map(this.renderKey)}</div>
        <div className={`${prefixCls}__handle`}>
          <div
            className={`${prefixCls}__item`}
            onTouchStart={() => this.onTouchLongPressIn('delete')}
            onTouchEnd={this.onTouchLongPressOut}
            onTouchCancel={this.onTouchLongPressOut}
            onMouseDown={() => this.onMouseLongPressIn('delete')}
            onMouseUp={this.onMouseLongPressOut}
          >
            <DeleteKeyIcon size="lg" />
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
