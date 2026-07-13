import { createBEM } from '@zarm-design/bem';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Keyboard from '../keyboard';
import type { PickerContainerCssVars } from '../picker/Container';
import Popup from '../popup';
import SafeArea from '../safe-area';
import mergeDefaultProps from '../utils/mergeDefaultProps';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseKeyBoardPickerProps } from './interface';

export interface KeyboardPickerCssVars {
  '--background'?: React.CSSProperties['background'];
}

export type KeyboardPickerProps = BaseKeyBoardPickerProps &
  HTMLProps<KeyboardPickerCssVars & PickerContainerCssVars>;

const KeyboardPicker = React.forwardRef<unknown, KeyboardPickerProps>((props, ref) => {
  props = mergeDefaultProps(defaultProps, props);
  const { className, style, visible, destroy, safeArea, ...restProps } = props;

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
      visible={currentVisible}
      mask={false}
      lockScroll={false}
      destroy={destroy}
    >
      <div className={cls} style={style}>
        <Keyboard {...restProps} />
        {(safeArea ?? globalSafeArea) && <SafeArea position="bottom" />}
      </div>
    </Popup>
  );
});

KeyboardPicker.displayName = 'KeyboardPicker';

const defaultProps: Partial<KeyboardPickerProps> = {
  visible: false,
  type: 'number',
  destroy: true,
};

export default KeyboardPicker;
