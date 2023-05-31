import { createBEM } from '@zarm-design/bem';
import React, { forwardRef, useContext } from 'react';
import { ConfigContext } from '../config-provider';
import { HTMLProps } from '../utils/utilityTypes';
import { BaseDropdownItemProps } from './interface';

export type DropdownItemProps = BaseDropdownItemProps & HTMLProps;

const DropdownItem: React.FC<DropdownItemProps> = forwardRef((props, ref) => {
  const { className } = props;

  const { prefixCls } = useContext(ConfigContext);
  const bem = createBEM('dropdown-item', { prefixCls });

  const renderContent = () => {
    return (
      <div
        className={bem('popup-content')}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {props.children}
      </div>
    );
  };

  return (
    <div className={bem([className])}>
      {renderContent()}
    </div>
  );
});

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;
