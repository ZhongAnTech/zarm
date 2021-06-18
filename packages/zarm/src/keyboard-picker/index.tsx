import * as React from 'react';
import type PropsType from './PropsType';
import Keyboard from '../keyboard';
import Popup from '../popup';

export interface KeyboardPickerProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

const KeyboardPicker = React.forwardRef<unknown, KeyboardPickerProps>(
  (
    {
      prefixCls = 'za-keyboard-picker',
      className,
      visible = false,
      type = 'number',
      destroy = true,
      onKeyClick,
      ...restProps
    }: KeyboardPickerProps,
    ref,
  ) => {
    const keyboardPickerRef = (ref as any) || React.createRef<HTMLDivElement>();
    const [currentVisible, setCurrentVisible] = React.useState(visible);

    const onKeyboardKeyClick = (key: string) => {
      if (typeof onKeyClick === 'function') {
        onKeyClick(key);
      }
    };

    React.useEffect(() => {
      setCurrentVisible(visible);
    }, [visible]);

    return (
      <Popup className={className} visible={currentVisible} mask={false} destroy={destroy}>
        <div className={prefixCls} ref={keyboardPickerRef}>
          <Keyboard type={type} onKeyClick={onKeyboardKeyClick} {...restProps} />
        </div>
      </Popup>
    );
  },
);

KeyboardPicker.displayName = 'KeyboardPicker';

export default KeyboardPicker;
