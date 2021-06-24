import * as React from 'react';
import classnames from 'classnames';
import { Keyboard as KeyboardIcon, DeleteKey as DeleteKeyIcon } from '@zarm-design/icons';
// import useLongPress from '../useLongPress';
import type { BaseKeyBoardProps } from './interface';

type KeyType = Exclude<BaseKeyBoardProps['type'], undefined>;

const KEYS: { [type in KeyType]: readonly string[] } = {
  number: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'close'],
  price: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'close'],
  idcard: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', '0', 'close'],
};

// let longPressTimer: number | null;

export interface KeyboardProps extends BaseKeyBoardProps {
  prefixCls?: string;
  className?: string;
}

const Keyboard = React.forwardRef<unknown, KeyboardProps>((props, ref) => {
  const { prefixCls, className, type, onKeyClick, locale } = props;

  const keyboardRef = (ref as any) || React.createRef<HTMLElement>();

  const cls = classnames(prefixCls, className);
  const getKeys = KEYS[type!];

  const onKeyPress = (e, key: string) => {
    e.stopPropagation();

    if (key.length === 0) {
      return;
    }

    if (typeof onKeyClick === 'function') {
      onKeyClick(key);
    }
  };

  // todo: 长按连续删除还有点问题
  // const longPressEvent = useLongPress({},
  //   (e) => {
  //     longPressTimer = window.setInterval(() => {
  //       onKeyPress(e, 'delete');
  //     }, 200);
  //   },
  //   (e) => onKeyPress(e, 'delete'),
  //   () => clearInterval(longPressTimer!),
  // );

  const renderKey = (text: string, index: number) => {
    const keyCls = classnames(`${prefixCls}__item`, {
      [`${prefixCls}__item--disabled`]: text.length === 0,
    });

    return (
      <div className={keyCls} key={+index} onClick={(e) => onKeyPress(e, text)}>
        {text === 'close' ? <KeyboardIcon size="lg" /> : text}
      </div>
    );
  };

  return (
    <div className={cls} ref={keyboardRef}>
      <div className={`${prefixCls}__keys`}>{getKeys.map(renderKey)}</div>
      <div className={`${prefixCls}__handle`}>
        <div
          className={`${prefixCls}__item`}
          onClick={(e) => onKeyPress(e, 'delete')}
          // {...longPressEvent}
        >
          <DeleteKeyIcon size="lg" />
        </div>
        <div
          className={`${prefixCls}__item ${prefixCls}__item--ok`}
          onClick={(e) => onKeyPress(e, 'ok')}
        >
          {locale!.okText}
        </div>
      </div>
    </div>
  );
});

Keyboard.displayName = 'Keyboard';

Keyboard.defaultProps = {
  prefixCls: 'za-keyboard',
  type: 'number',
};

export default Keyboard;
