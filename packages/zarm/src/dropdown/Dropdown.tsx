import { createBEM } from '@zarm-design/bem';
import { ArrowDown, ArrowUp } from '@zarm-design/icons';
import React, {
  Children,
  cloneElement,
  CSSProperties,
  forwardRef,
  ReactElement,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ConfigContext } from '../config-provider';
import Popup from '../popup';
import Transition from '../transition';
import useScroll from '../use-scroll';
import { noop } from '../utils';
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
  _zIndex: number;
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

const Dropdown = Object.assign(
  forwardRef<DropdownInstance, DropdownProps>((props, ref) => {
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

    const [currentPopupKey, setCurrentPopupKey] = useState<string | number>();
    const root = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const offset = useRef<number>(0);
    const scrollContainer = useRef<HTMLElement | Window>(null);
    const dropdownItemPopupRef = useRef<HTMLDivElement>(null);

    const toggleItem = (key: DropdownItemKey | null) => {
      const nextKey = key === currentPopupKey ? null : key;
      setCurrentPopupKey(nextKey);
      typeof onChange === 'function' && onChange(nextKey);
    };

    const DefaultArrow = (reverse = false) =>
      reverse ? <ArrowDown size="sm" /> : <ArrowUp size="sm" />;

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

    const computeOffset = () => {
      const { top, bottom } = barRef.current.getBoundingClientRect();
      if (direction === 'up') {
        offset.current = window.innerHeight - top;
      } else {
        offset.current = bottom;
      }
    };

    useScroll({
      container: scrollContainer,
      onScroll: () => {
        computeOffset();
      },
    });

    useEffect(() => {
      if (root.current) {
        scrollContainer.current = getScrollableParent(root.current);
      }
    }, []);

    useEffect(() => {
      if (barRef.current) {
        computeOffset();
      }
    }, [barRef.current]);

    useEffect(() => {
      setCurrentPopupKey(getActiveKey({ activeKey, defaultActiveKey }));
    }, [activeKey, defaultActiveKey]);

    useEffect(() => {
      if (dropdownItemPopupRef.current) {
        dropdownItemPopupRef.current.style.position = 'absolute';
      }
    }, [currentPopupKey, dropdownItemPopupRef.current]);

    useImperativeHandle(ref, () => ({
      open: (key?: string) => {
        toggleItem(key);
      },
      close: () => {
        toggleItem(null);
      },
    }));

    const renderPopContent = () => {
      const styleOffset: CSSProperties = {};
      if (direction === 'down') {
        styleOffset.top = `${offset.current}px`;
      } else {
        styleOffset.bottom = `${offset.current}px`;
        styleOffset.height = `auto`;
      }

      if (currentPopupKey) {
        Dropdown._zIndex += 1;
      }
      const animationDirection = direction === 'up' ? 'bottom' : 'top';
      const transitionName = animationType ?? TRANSITION_NAMES[animationDirection];

      return (
        <Popup
          ref={dropdownItemPopupRef}
          style={{ ...styleOffset, zIndex: props.zIndex || Dropdown._zIndex }}
          className={bem('dropdown-popup-wrapper', [popupClassName])}
          maskStyle={{ ...styleOffset, zIndex: props.zIndex || Dropdown._zIndex }}
          direction={animationDirection}
          visible={!!currentPopupKey}
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
    };

    return (
      <div ref={root} className={bem([className])}>
        <div ref={barRef} className={bem('bar')}>
          {Children.map(props.children, (child: ReactElement<DropdownItemProps>) => {
            return renderTitle(child.props, child.key);
          })}
        </div>
        {renderPopContent()}
      </div>
    );
  }),
  { _zIndex: 1200 }, // default zIndex, prior to the default popup zIndex
);

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
