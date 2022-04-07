import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import Keyboard from '../keyboard';
import Popup from '../popup';
import { ConfigContext } from '../n-config-provider';
import type { BaseKeyBoardPickerProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export type KeyboardPickerProps = BaseKeyBoardPickerProps & HTMLProps;

const KeyboardPicker = React.forwardRef<unknown, KeyboardPickerProps>((props, ref) => {
  const { className, visible, destroy, ...restProps } = props;

  const keyboardPickerRef = (ref as any) || React.createRef<HTMLDivElement>();
  const [currentVisible, setCurrentVisible] = React.useState(visible);

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('keyboard-picker', { prefixCls });
  const cls = bem([className]);

  React.useEffect(() => {
    setCurrentVisible(visible);
  }, [visible]);

  return (
    <Popup
      ref={keyboardPickerRef}
      className={cls}
      visible={currentVisible}
      mask={false}
      destroy={destroy}
    >
      <Keyboard {...restProps} />
    </Popup>
  );
});

KeyboardPicker.displayName = 'KeyboardPicker';

KeyboardPicker.defaultProps = {
  visible: false,
  type: 'number',
  destroy: true,
};

export default KeyboardPicker;
