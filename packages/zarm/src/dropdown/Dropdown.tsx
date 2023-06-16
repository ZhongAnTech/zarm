import { createBEM } from '@zarm-design/bem';
import { ArrowDown, ArrowUp } from '@zarm-design/icons';
import raf from 'raf';
import React, {
  Children,
  cloneElement,
  CSSProperties,
  forwardRef,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ConfigContext } from '../config-provider';
import Popup from '../popup';
import Transition from '../transition';
import useClickAway from '../use-click-away';
import useScroll from '../use-scroll';
import { noop } from '../utils';
import Events from '../utils/events';
import { HTMLProps } from '../utils/utilityTypes';
import DropdownItem, { DropdownItemProps } from './DropdownItem';
import type { BaseDropdownProps, DropdownCssVars, DropdownItemKey } from './interface';

export type DropdownProps = BaseDropdownProps & HTMLProps<DropdownCssVars>;
export interface DropdownInstance {
  open: (key?: string) => void;
  close: () => void;
}

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<DropdownProps & React.RefAttributes<DropdownInstance>> {
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

const TRANSITION_NAMES = {
  top: 'move-down',
  bottom: 'move-up',
  center: 'fade',
  left: 'move-left',
  right: 'move-right',
};

const overflowScrollRegExp = /scroll|auto|overlay/i;

const isScrollable = function (ele: HTMLElement) {
  const hasScrollableContent = ele.scrollHeight > ele.clientHeight;
  const { overflowY } = window.getComputedStyle(ele);
  const isOverflowHidden = overflowScrollRegExp.test(overflowY);
  return hasScrollableContent && isOverflowHidden;
};

const getScrollableParent = function (ele: HTMLElement, global = window) {
  if (!ele || ele === document.body) return global;
  return isScrollable(ele) ? ele : getScrollableParent(ele.parentElement);
};

const Dropdown = forwardRef<DropdownInstance, DropdownProps>((props, ref) => {
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
    animationDuration,
    arrow,
    popupClassName,
    onChange,
  } = props;

  const { prefixCls } = useContext(ConfigContext);
  const bem = createBEM('dropdown', { prefixCls });

  // internal visible prop
  const [internalVisible, setInternalVisible] = useState<boolean>(false);
  const [currentPopupKey, setCurrentPopupKey] = useState<string | number>(
    getActiveKey({ activeKey, defaultActiveKey }),
  );

  // merge visible props
  const mergeVisible = !!currentPopupKey ?? internalVisible;

  useEffect(() => {
    setCurrentPopupKey(getActiveKey({ activeKey, defaultActiveKey }));
  }, [activeKey, defaultActiveKey]);

  const root = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(0);
  const scrollContainer = useRef<HTMLElement | Window>(null);
  const dropdownItemPopupRef = useRef<HTMLDivElement>(null);

  const toggleItem = (key: DropdownItemKey | null) => {
    const nextKey = key === currentPopupKey ? null : key;
    if (nextKey === currentPopupKey) return;
    setCurrentPopupKey(nextKey);

    // If the activeKey is undefined, use the internal visible to control the popup
    if (activeKey === undefined) {
      setInternalVisible(nextKey !== null);
    }
    typeof onChange === 'function' && onChange(nextKey);
  };

  // === popup offset
  const computeOffset = useCallback(() => {
    const { top, bottom } = barRef.current.getBoundingClientRect();
    setOffset(direction === 'up' ? window.innerHeight - top : bottom);
  }, [barRef.current]);

  useEffect(() => {
    if (barRef.current) {
      computeOffset();
      Events.on(window, 'resize', computeOffset);
      Events.on(window, 'orientationchange', computeOffset);
    }

    return () => {
      Events.off(window, 'resize', computeOffset);
      Events.off(window, 'orientationchange', computeOffset);
    };
  }, []);

  useEffect(() => {
    if (root.current) {
      scrollContainer.current = getScrollableParent(root.current);
    }
  }, [root.current]);

  useScroll({
    container: scrollContainer,
    onScroll: () => {
      computeOffset();
    },
  });

  useEffect(() => {
    if (dropdownItemPopupRef.current) {
      dropdownItemPopupRef.current.style.position = 'absolute';
    }
  }, [mergeVisible]);

  // === lock ref & click away
  const lockRef = useRef(false);
  const openRef = useRef(mergeVisible);

  if (openRef.current !== mergeVisible) {
    lockRef.current = true;
    openRef.current = mergeVisible;
  }

  useEffect(() => {
    const id = raf(() => {
      lockRef.current = false;
    });
    return () => raf.cancel(id);
  }, [mergeVisible]);

  const onClickOutside = () => {
    if (!lockRef.current && openRef.current) {
      toggleItem(null);
    }
  };

  useClickAway([root], onClickOutside);

  // expose methods
  useImperativeHandle(ref, () => ({
    open: (key?: string) => {
      toggleItem(key);
    },
    close: () => {
      toggleItem(null);
    },
  }));

  const DefaultArrow = (reverse = false) =>
    reverse ? <ArrowDown size="sm" /> : <ArrowUp size="sm" />;
  // render title
  const renderTitle = (item: DropdownItemProps, key: DropdownItemKey) => {
    return (
      <div
        key={key}
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={bem('bar-item', [{ disabled, active: currentPopupKey === key }])}
        onClick={() => {
          if (!disabled) {
            toggleItem(key);
          }
        }}
      >
        <div className={bem('title')}>{item.title}</div>
        <div className={bem('arrow')}>
          {item.arrow ? item.arrow : arrow || DefaultArrow(direction === 'down')}
        </div>
      </div>
    );
  };

  // render content
  const styleOffset: CSSProperties = {};
  if (direction === 'down') {
    styleOffset.top = `${offset}px`;
  } else {
    styleOffset.bottom = `${offset}px`;
    styleOffset.height = `auto`;
  }
  const animationDirection = direction === 'up' ? 'bottom' : 'top';
  const transitionName = animationType ?? TRANSITION_NAMES[animationDirection];

  const renderPopContent = (
    <Popup
      ref={dropdownItemPopupRef}
      style={{ ...styleOffset }}
      className={bem('dropdown-popup-wrapper', [popupClassName])}
      maskStyle={{ ...styleOffset }}
      direction={animationDirection}
      visible={mergeVisible}
      onMaskClick={maskClosable ? () => toggleItem(currentPopupKey) : noop}
      forceRender={forceRender}
      destroy={destroy}
      maskOpacity={maskOpacity}
      animationDuration={animationDuration}
    >
      {Children.map(props.children, (child: ReactElement<DropdownItemProps>) => {
        return (
          <Transition
            visible={currentPopupKey === child.key}
            tranisitionName={`${prefixCls}-${transitionName}`}
            forceRender={forceRender}
            destroy={destroy}
            duration={animationDuration}
          >
            <div className={bem([{ [`${animationDirection}`]: !!animationDirection }])}>
              {cloneElement(child, {
                key: child.key,
              })}
            </div>
          </Transition>
        );
      })}
    </Popup>
  );

  return (
    <div ref={root} className={bem([className])}>
      <div ref={barRef} className={bem('bar')}>
        {Children.map(props.children, (child: ReactElement<DropdownItemProps>) => {
          return renderTitle(child.props, child.key);
        })}
      </div>
      {renderPopContent}
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {
  disabled: false,
  direction: 'down',
  forceRender: false,
  destroy: false,
  maskClosable: true,
  maskOpacity: 0.7,
};
export default Dropdown as CompoundedComponent;
