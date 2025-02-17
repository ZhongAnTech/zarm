import { createBEM } from '@zarm-design/bem';
import { DeleteKey as DeleteKeyIcon, Keyboard as KeyboardIcon } from '@zarm-design/icons';
import React, {
  CSSProperties,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { ConfigContext } from '../config-provider';
import useLongPress from '../use-long-press';
import { useLatest } from '../utils/hooks';
import type { HTMLProps } from '../utils/utilityTypes';
import BuildInConfig from './BuildInConfig';
import type { BaseKeyBoardProps, KeyBoardKey } from './interface';

export interface KeyboardCssVars {
  '--background'?: CSSProperties['background'];
  '--item-background'?: CSSProperties['background'];
  '--item-active-background'?: CSSProperties['background'];
  '--item-gap'?: CSSProperties['gap'];
  '--item-height'?: CSSProperties['height'];
  '--item-font-size'?: CSSProperties['fontSize'];
  '--item-border-radius'?: CSSProperties['borderRadius'];
  '--item-box-shadow'?: CSSProperties['boxShadow'];
  '--ok-background'?: CSSProperties['background'];
  '--ok-font-size'?: CSSProperties['fontSize'];
  '--ok-text-color'?: CSSProperties['color'];
}

export type KeyboardProps = BaseKeyBoardProps & HTMLProps<KeyboardCssVars>;

const Keyboard = forwardRef<HTMLDivElement, KeyboardProps>((props, ref) => {
  const { className, style, type, dataSource, onKeyClick, ...restProps } = props;

  const { locale: globalLocal, prefixCls } = useContext(ConfigContext);
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

  const timerRef = useRef(0);
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

  const renderKey = useCallback((text: ReactNode | KeyBoardKey, index: number) => {
    const keyObj: ReactNode | KeyBoardKey = (
      typeof text === 'object' ? text : { text }
    ) as KeyBoardKey;

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
          return locale!.confirmText;

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
        <div {...commonProps} {...longPressEvent}>
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
    <div
      ref={ref}
      className={cls}
      style={{ gridTemplateColumns, ...style }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      {...restProps}
    >
      {(getKeyConfig.keys || []).map(renderKey)}
    </div>
  );
});

Keyboard.displayName = 'Keyboard';

Keyboard.defaultProps = {
  type: 'number',
};

export default Keyboard;
