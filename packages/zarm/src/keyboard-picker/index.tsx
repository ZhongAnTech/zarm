import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Keyboard from '../keyboard';
import Popup from '../popup';
import SafeArea from '../safe-area';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseKeyBoardPickerProps } from './interface';

export type KeyboardPickerProps = BaseKeyBoardPickerProps & HTMLProps;

const KeyboardPicker = React.forwardRef<unknown, KeyboardPickerProps>((props, ref) => {
  const { className, visible, destroy, safeArea, ...restProps } = props;

  const keyboardPickerRef = (ref as any) || React.createRef<HTMLDivElement>();
  const [currentVisible, setCurrentVisible] = React.useState(visible);

  const { prefixCls, safeArea: globalSafeArea } = React.useContext(ConfigContext);
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
      lockScroll={false}
      destroy={destroy}
    >
      <div className={bem('wrapper')}>
        <Keyboard {...restProps} />
        {(safeArea ?? globalSafeArea) && <SafeArea position="bottom" />}
      </div>
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
