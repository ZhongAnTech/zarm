import { createBEM } from '@zarm-design/bem';
import React, { CSSProperties, forwardRef, useContext, useEffect, useRef } from 'react';
import { ConfigContext } from '../config-provider';
import Popup from '../popup';
import { noop } from '../utils';
import { HTMLProps } from '../utils/utilityTypes';
import { DropdownContext } from './context';
import { BaseDropdownItemProps } from './interface';

export type DropdownItemProps = BaseDropdownItemProps & HTMLProps;

export interface DropdownItemElement extends HTMLDivElement {
  toggle: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = forwardRef((props, ref) => {
  const { className, style, visible, direction, offset } = props;

  const { prefixCls } = useContext(ConfigContext);
  const parent = useContext(DropdownContext);
  const bem = createBEM('dropdown-item', { prefixCls });

  const dropdownItemPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && dropdownItemPopupRef.current) {
      dropdownItemPopupRef.current.style.position = 'absolute';
    }
  }, [visible]);

  const renderContent = () => {
    const styleOffset: CSSProperties = {};

    if (direction === 'top') {
      styleOffset.top = `${offset}px`;
    } else {
      styleOffset.bottom = `${offset}px`;
      styleOffset.height = `auto`;
    }

    return (
      <Popup
        ref={dropdownItemPopupRef}
        style={{ ...style, ...styleOffset }}
        className={bem('dropdown-popup-wrapper')}
        maskStyle={{ ...styleOffset }}
        direction={direction}
        visible={visible}
        onMaskClick={parent.maskClosable ? parent.onClose : noop}
        forceRender={parent.forceRender}
        destroy={parent.destroy}
        maskOpacity={parent.maskOpacity}
        animationType={parent.animationType}
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
    );
  };

  return (
    <div className={bem([className])}>
      {renderContent()}
    </div>
  );
});

export default DropdownItem;
