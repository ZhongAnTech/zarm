import * as React from 'react';
import classnames from 'classnames';
import { Keyboard as KeyboardIcon, DeleteKey as DeleteKeyIcon } from '@zarm-design/icons';
// import useLongPress from '../useLongPress';
import type { BaseKeyBoardProps } from './interface';
import { ConfigContext } from '../n-config-provider';

type KeyType = Exclude<BaseKeyBoardProps['type'], undefined>;

const KEYS: { [type in KeyType]: readonly string[] } = {
  number: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'close'],
  price: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'close'],
  idcard: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', '0', 'close'],
};

// let longPressTimer: number | null;

export interface KeyboardProps extends BaseKeyBoardProps {
  className?: string;
  style?: React.CSSProperties;
}

const Keyboard = React.forwardRef<unknown, KeyboardProps>((props, ref) => {
  const { className, type, onKeyClick, ...restProps } = props;
  const keyboardRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { locale: globalLocal, prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const locale = globalLocal?.Keyboard;
  const prefixCls = `${globalPrefixCls}-keyboard`;

  const cls = classnames(prefixCls, className);
  const getKeys = KEYS[type!];

  let touchLongPressTimer = 0;
  let mouseLongPressTimer = 0;

  const onKeyPress = (e, key: string) => {
    e.stopPropagation();

    if (key.length === 0) {
      return;
    }

    if (typeof onKeyClick === 'function') {
      onKeyClick(key);
    }
  };

  const onTouchLongPressIn = (e: React.TouchEvent<HTMLDivElement>, key: string) => {
    onKeyPress(e, key);
    touchLongPressTimer = window.setTimeout(() => {
      touchLongPressTimer = window.setInterval(() => {
        onKeyPress(e, key);
      }, 100);
    }, 800);
  };

  const onTouchLongPressOut = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.clearInterval(touchLongPressTimer);
  };

  const onMouseLongPressIn = (e: React.MouseEvent<HTMLDivElement>, key: string) => {
    onKeyPress(e, key);
    mouseLongPressTimer = window.setTimeout(() => {
      mouseLongPressTimer = window.setInterval(() => {
        onKeyPress(e, key);
      }, 100);
    }, 800);
  };

  const onMouseLongPressOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.clearInterval(mouseLongPressTimer);
  };

  // todo: 长按连续删除还有点问题
  // const longPressEvent = useLongPress({
  //   onLongPress: (e) => {
  //     longPressTimer = window.setInterval(() => {
  //       onKeyPress(e, 'delete');
  //     }, 200);
  //   },
  //   onPress: (e) => onKeyPress(e, 'delete'),
  //   onClear: () => clearInterval(longPressTimer!),
  // });

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
    <div className={cls} ref={keyboardRef} {...restProps}>
      <div className={`${prefixCls}__keys`}>{getKeys.map(renderKey)}</div>
      <div className={`${prefixCls}__handle`}>
        <div
          className={`${prefixCls}__item`}
          onTouchStart={(e) => onTouchLongPressIn(e, 'delete')}
          onTouchEnd={onTouchLongPressOut}
          onTouchCancel={onTouchLongPressOut}
          onMouseDown={(e) => onMouseLongPressIn(e, 'delete')}
          onMouseUp={onMouseLongPressOut}
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
  type: 'number',
};

export default Keyboard;
