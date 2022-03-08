import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { DeleteKey as DeleteKeyIcon, Keyboard as KeyboardIcon } from '@zarm-design/icons';
import useLongPress from '../useLongPress';
import { ConfigContext } from '../n-config-provider';
import BuildInConfig from './BuildInConfig';
import type { BaseKeyBoardProps, KeyBoardKey, KeyBoardDataSource } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export interface KeyboardCssVars {
  '--za-keyboard-background'?: React.CSSProperties['background'];
  '--za-keyboard-item-background'?: React.CSSProperties['background'];
  '--za-keyboard-item-active-background'?: React.CSSProperties['background'];
  '--za-keyboard-item-gap'?: React.CSSProperties['gap'];
  '--za-keyboard-item-height'?: React.CSSProperties['height'];
  '--za-keyboard-item-font-size'?: React.CSSProperties['fontSize'];
  '--za-keyboard-item-border-radius'?: React.CSSProperties['borderRadius'];
  '--za-keyboard-item-box-shadow'?: React.CSSProperties['boxShadow'];
  '--za-keyboard-ok-background'?: React.CSSProperties['background'];
  '--za-keyboard-ok-font-size'?: React.CSSProperties['fontSize'];
  '--za-keyboard-ok-text-color'?: React.CSSProperties['color'];
}

export type KeyboardProps = BaseKeyBoardProps &
  HTMLProps & {
    dataSource?: KeyBoardDataSource;
  };

const Keyboard = React.forwardRef<unknown, KeyboardProps>((props, ref) => {
  const { className, style, type, dataSource, onKeyClick, ...restProps } = props;
  const keyboardRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { locale: globalLocal, prefixCls } = React.useContext(ConfigContext);
  const locale = globalLocal?.Keyboard;

  const bem = createBEM('keyboard', { prefixCls });
  const cls = bem([className]);

  const getKeyConfig = dataSource || BuildInConfig[type!];
  let longPressTimer: number | null;

  const onKeyPress = (e, text: KeyBoardKey | KeyBoardKey['value']) => {
    e.stopPropagation();

    const keyObj: KeyBoardKey = typeof text === 'object' ? text : { text };
    const key = keyObj.value || (keyObj.text as KeyBoardKey['value']);

    if (!text || keyObj.disabled) return;
    if (typeof onKeyClick === 'function') {
      onKeyClick(key);
    }
  };

  const longPressEvent = useLongPress({
    // todo: 长按连续删除还有点问题，暂时关闭支持
    // onLongPress: (e) => {
    //   e.stopPropagation();
    //   longPressTimer = window.setInterval(() => {
    //     onKeyPress(e, 'delete');
    //   }, 100);
    // },
    onPress: (e) => onKeyPress(e, 'delete'),
    onClear: () => clearInterval(longPressTimer!),
  });

  const renderKey = (text: KeyBoardKey, index: number) => {
    const keyObj: KeyBoardKey = typeof text === 'object' ? text : { text };

    const commonProps = {
      key: +index,
      className: bem('item', [
        {
          blank: keyObj.text === '',
          ok: keyObj.text === 'ok',
          disabled: keyObj.disabled,
        },
      ]),
      style: {},
    };

    if (keyObj.rowSpan! > 1) {
      commonProps.style = {
        ...commonProps.style,
        gridRow: `auto / span ${keyObj.rowSpan}`,
        height: '100%',
      };
    }

    if (keyObj.colSpan! > 1) {
      commonProps.style = {
        ...commonProps.style,
        gridColumn: `auto / span ${keyObj.colSpan}`,
      };
    }

    const renderText = () => {
      switch (keyObj.text) {
        case 'ok':
          return locale!.okText;

        case 'delete':
          return <DeleteKeyIcon size="lg" />;

        case 'close':
          return <KeyboardIcon size="lg" />;

        default:
          return keyObj.text;
      }
    };

    if (keyObj.text === 'delete')
      return (
        <div {...commonProps} {...longPressEvent}>
          {renderText()}
        </div>
      );

    return (
      <div {...commonProps} onClick={(e) => onKeyPress(e, keyObj)}>
        {renderText()}
      </div>
    );
  };

  const gridTemplateColumns = Array.from(Array(getKeyConfig.columns).keys())
    .map(() => '1fr')
    .join(' ');

  return (
    <div ref={keyboardRef} className={cls} style={{ gridTemplateColumns, ...style }} {...restProps}>
      {(getKeyConfig.keys || []).map(renderKey)}
    </div>
  );
});

Keyboard.displayName = 'Keyboard';

Keyboard.defaultProps = {
  type: 'number',
};

export default Keyboard;
