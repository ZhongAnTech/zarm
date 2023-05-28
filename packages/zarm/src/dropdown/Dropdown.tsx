import { createBEM } from '@zarm-design/bem';
import React, {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ArrowDown, ArrowUp } from '@zarm-design/icons';
import { ConfigContext } from '../config-provider';
import useScroll from '../use-scroll';
import { HTMLProps } from '../utils/utilityTypes';
import { DropdownContext } from './context';
import DropdownItem, { DropdownItemElement, DropdownItemProps } from './DropdownItem';
import type { BaseDropdownProps, DropdownItemKey } from './interface';

export type DropdownProps = BaseDropdownProps & HTMLProps<any>;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<DropdownProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof DropdownItem;
}

const getActiveKey = ({ activeKey, defaultActiveKey }) => {
  if (typeof activeKey !== 'undefined') {
    return activeKey;
  }
  if (typeof defaultActiveKey !== 'undefined') {
    return defaultActiveKey;
  }
  return null;
};

const Dropdown: React.FC<DropdownProps> = forwardRef((props, ref) => {
  const {
    className,
    activeKey,
    defaultActiveKey,
    disabled,
    direction,
    forceRender,
    destroy,
    maskClosable,
    maskOpacity,
    animationType,
    arrow,
    onClose,
    onChange,
    afterClose,
  } = props;

  const { prefixCls } = useContext(ConfigContext);
  const bem = createBEM('dropdown', { prefixCls });

  const [currentPopupKey, setCurrentPopupKey] = useState<string | number>(
    getActiveKey({ activeKey, defaultActiveKey }),
  );
  const refs = useRef<Record<DropdownItemKey, DropdownItemElement>>({});
  const root = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const offset = useRef<number>(0);
  const scrollContainer = useRef<HTMLElement>(document.body);

  const setChildrenRefs = (key: number | string) => (el: DropdownItemElement) => {
    if (el) {
      refs.current[key] = el;
    }
  };

  const toggleItem = (key: DropdownItemKey | null) => {
    if (key === currentPopupKey) {
      setCurrentPopupKey(null)
      typeof onClose === 'function' && onClose();
    } else {
      setCurrentPopupKey(key);
    }
    typeof onChange === 'function' && onChange(key);
  };

  const DefaultArrow = (
    reverse = false,
  ) => (
     reverse ?
      <ArrowDown size='sm'/>
      : <ArrowUp size='sm'/>
  );

  const renderTitle = (item: DropdownItemProps, key: DropdownItemKey) => {
    return (
      <div
        key={key}
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={bem('bar-item', [{ 'disabled': disabled, 'active': currentPopupKey === key }]) }
        onClick={() => {
          if (!disabled) {
            toggleItem(key);
          }
        }}
      >
        <div className={bem('title')}>{item.title}</div>
          { arrow ??  <div className={bem('arrow')}>{ DefaultArrow(direction === 'bottom') }</div> }
      </div>
    );
  };

  const computeOffset = () => {
    const { top, bottom } = barRef.current.getBoundingClientRect();
    if (direction === 'top') {
      offset.current = bottom;
    } else {
      offset.current = window.innerHeight - top;
    }
  };

  const onScroll = () => {
    computeOffset();
  };

  useScroll({
    container: scrollContainer,
    onScroll,
  });

  useEffect(() => {
    if (barRef.current) {
      computeOffset();
    }
  }, [barRef.current]);

  useEffect(() => {
    getActiveKey({ activeKey, defaultActiveKey });
  }, [activeKey, defaultActiveKey]);

  return (
    <DropdownContext.Provider
      value={{
        forceRender,
        destroy,
        onClose: () => {
          toggleItem(currentPopupKey)
        },
        afterClose,
        maskClosable,
        maskOpacity,
        animationType,
      }}
    >
      <div ref={root} className={bem([className])}>
        <div ref={barRef} className={bem('bar')}>
          {Children.map(props.children, (child: ReactElement<DropdownItemProps>) => {
            return renderTitle(child.props, child.key);
          })}
        </div>
        {Children.map(
          props.children,
          (child: ReactElement<DropdownItemProps & { ref: (el: DropdownItemElement) => void }>) => {
            return cloneElement(child, {
              ref: setChildrenRefs(child.key),
              direction: props.direction,
              offset: offset.current,
              visible: currentPopupKey === child.key,
            });
          },
        )}
      </div>
    </DropdownContext.Provider>
  );
});
Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {
  disabled: false,
  direction: 'top',
  forceRender: false,
  destroy: false,
  maskClosable: true,
  maskOpacity: 0.7
};
export default Dropdown as CompoundedComponent;
