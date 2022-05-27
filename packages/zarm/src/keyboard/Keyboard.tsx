import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { DeleteKey as DeleteKeyIcon, Keyboard as KeyboardIcon } from '@zarm-design/icons';
import useLongPress from '../useLongPress';
import { ConfigContext } from '../n-config-provider';
import BuildInConfig from './BuildInConfig';
import type { BaseKeyBoardProps, KeyBoardKey, KeyBoardDataSource } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';
import { useLatest } from '../utils/hooks';

export interface KeyboardCssVars {
  '--background'?: React.CSSProperties['background'];
  '--item-background'?: React.CSSProperties['background'];
  '--item-active-background'?: React.CSSProperties['background'];
  '--item-gap'?: React.CSSProperties['gap'];
  '--item-height'?: React.CSSProperties['height'];
  '--item-font-size'?: React.CSSProperties['fontSize'];
  '--item-border-radius'?: React.CSSProperties['borderRadius'];
  '--item-box-shadow'?: React.CSSProperties['boxShadow'];
  '--ok-background'?: React.CSSProperties['background'];
  '--ok-font-size'?: React.CSSProperties['fontSize'];
  '--ok-text-color'?: React.CSSProperties['color'];
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

  const onKeyPress = (e, text: KeyBoardKey | KeyBoardKey['value']) => {
    e.stopPropagation();

    const keyObj: KeyBoardKey = typeof text === 'object' ? text : { text };
    const key = keyObj.value || (keyObj.text as KeyBoardKey['value']);

    if (!text || keyObj.disabled) return;
    if (typeof onKeyClick === 'function') {
      onKeyClick(key);
    }
  };

  const timerRef = React.useRef(0);
  const onKeyPressRef = useLatest(onKeyPress);

  const longPressEvent = useLongPress({
    // 长按连续删除
    onLongPress: (e) => {
      clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        onKeyPressRef.current(e, 'delete');
      }, 100);
    },
    onPress: (e) => {
      clearInterval(timerRef.current);
      onKeyPressRef.current(e, 'delete');
    },
    onClear: () => clearInterval(timerRef.current),
  });

  const renderKey = React.useCallback((text: KeyBoardKey, index: number) => {
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
          return <DeleteKeyIcon size="lg" style={{ pointerEvents: 'none' }} />;

        case 'close':
          return <KeyboardIcon size="lg" />;

        default:
          return keyObj.text;
      }
    };

    if (keyObj.text === 'delete')
      return (
        <div
          {...commonProps}
          {...longPressEvent}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {renderText()}
        </div>
      );

    return (
      <div {...commonProps} onClick={(e) => onKeyPressRef.current?.(e, keyObj)}>
        {renderText()}
      </div>
    );
  }, []);

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
