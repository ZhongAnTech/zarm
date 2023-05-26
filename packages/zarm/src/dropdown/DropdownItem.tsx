import { createBEM } from '@zarm-design/bem';
import React, { CSSProperties, forwardRef, useContext, useEffect, useRef } from 'react';
import { ConfigContext } from '../config-provider';
import type { PickerCssVars } from '../picker';
import Popup from '../popup';
import { noop } from '../utils';
import { HTMLProps } from '../utils/utilityTypes';
import { DropdownContext } from './context';
import { BaseDropdownItemProps } from './interface';

export type DropdownItemProps = BaseDropdownItemProps & HTMLProps<PickerCssVars>;

export interface DropdownItemElement extends HTMLDivElement {
  toggle: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = forwardRef((props, ref) => {
  const { className, style, mountContainer, visible, direction, offset } = props;

  const { prefixCls } = useContext(ConfigContext);
  const parent = useContext(DropdownContext);
  const bem = createBEM('dropdown-item', { prefixCls });

  const dropdownItemRef = useRef<HTMLDivElement>(null);
  const dropdownItemPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && dropdownItemPopupRef.current) {
      if (direction === 'top') {
        dropdownItemPopupRef.current.style.top = `${offset}px`;
      } else {
        dropdownItemPopupRef.current.style.bottom = `${offset}px`;
      }
    }
  }, [visible, offset]);

  const renderContent = () => {
    const styleOffset: CSSProperties = {};

    if (direction === 'top') {
      styleOffset.top = `${offset}px`;
    } else {
      styleOffset.bottom = `${offset}px`;
      styleOffset.height = `auto`;
    }

    return (
      <div className={bem('', [className])} style={style}>
        <Popup
          ref={dropdownItemPopupRef}
          className={bem([className])}
          style={{ ...style, ...styleOffset }}
          maskStyle={{ ...styleOffset }}
          direction={direction}
          visible={visible}
          onMaskClick={parent.maskClosable ? parent.onClose : noop}
          afterClose={parent.afterClose}
          forceRender={parent.forceRender}
          destroy={parent.destroy}
          mountContainer={mountContainer || dropdownItemRef.current}
          maskOpacity={0.5}
          animationType="fade"
        >
          <div
            className={bem('popup-content')}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {props.children}
          </div>
        </Popup>
      </div>
    );
  };

  return (
    <div className={bem('popup')} ref={dropdownItemRef}>
      {renderContent()}
    </div>
  );
});

export default DropdownItem;
