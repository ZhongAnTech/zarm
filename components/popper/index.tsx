import React, { HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import classnames from 'classnames';

import ClickOutside from '../click-outside';
import domUtil from '../utils/dom';
import BasePopperProps, { PopperState, PopperTrigger, directionMap } from './PropsType';

export interface PopperProps extends BasePopperProps {
  prefixCls?: string;
  className?: string;
}

const invertKeyValues = (obj: object, fn?) => {
  return Object.keys(obj).reduce((acc, key) => {
    const val = fn ? fn(obj[key]) : obj[key];
    acc[val] = acc[val] || [];
    acc[val].push(key);
    return acc as object;
  }, {});
};

const getPopperClientRect = (popperOffsets) => {
  const offsets = { ...popperOffsets };
  offsets.right = offsets.left + offsets.width;
  offsets.bottom = offsets.top + offsets.height;
  return offsets;
};

const customArrowOffsetFn = (data: PopperJS.Data) => {
  const [placement, placement1] = data.placement.split('-');
  const arrow = data.instance.options.modifiers && data.instance.options.modifiers!.arrow!.element as Element;
  const { offsets: { reference } } = data;
  const popper = getPopperClientRect(data.offsets.popper);
  const isVertical = ['left', 'right'].indexOf(placement) !== -1;
  const len = isVertical ? 'height' : 'width';
  const side = isVertical ? 'top' : 'left';
  const altSide = isVertical ? 'left' : 'top';
  const opSide = isVertical ? 'bottom' : 'right';
  const arrowSize = domUtil.getOuterSizes(arrow as HTMLElement)[len];
  const offsetSize = parseFloat(getComputedStyle(data.instance.popper, null).paddingLeft!);
  const hashMap = {
    start: side === 'left' ? (reference[side] + offsetSize) : (reference[opSide] - offsetSize - arrowSize),
    center: reference[side] + reference[len] / 2 - arrowSize / 2,
    end: side === 'left' ? (reference[opSide] - offsetSize - arrowSize) : (reference[side] + offsetSize),
  };
  const place = hashMap[placement1 || 'center'];
  const sideValue = place - popper[side];

  data.arrowElement = arrow!;
  data.arrowStyles[side] = Math.floor(sideValue).toString();
  data.arrowStyles[altSide] = '';

  return data;
};

const popperInstances: Set<PopperJS> = new Set();

class Popper extends React.Component<PopperProps & HTMLAttributes<HTMLDivElement>, PopperState> {
  static defaultProps = {
    prefixCls: 'za-popper',
    hasArrow: false,
    arrowPointAtCenter: false,
    trigger: /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'click' : 'hover' as PopperTrigger,
    direction: 'top',
    mouseEnterDelay: 100,
    mouseLeaveDelay: 100,
    visible: false,
    content: '',
    onVisibleChange: () => {},
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    children: PropTypes.element.isRequired,
    visible: PropTypes.bool,
    hasArrow: PropTypes.bool,
    arrowPointAtCenter: PropTypes.bool,
    trigger: PropTypes.oneOf(['click', 'hover', 'focus', 'manual', 'contextMenu']),
    content: PropTypes.node,
    direction: PropTypes.oneOf([
      'top',
      'topLeft',
      'topRight',
      'right',
      'rightTop',
      'rightBottom',
      'bottom',
      'bottomLeft',
      'bottomRight',
      'left',
      'leftTop',
      'leftBottom',
    ]),
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    onVisibleChange: PropTypes.func,
  };

  static update() {
    popperInstances.forEach(popperInstance => popperInstance.scheduleUpdate());
  }

  static getDerivedStateFromProps(props: PopperProps, state: PopperState) {
    if ('visible' in props && props.trigger === 'manual') {
      return {
        ...state,
        visible: props.visible,
      };
    }
    return null;
  }

  state: PopperState = {
    visible: false,
    direction: this.props.direction!,
    arrowRef: null,
  };

  private popper: PopperJS | null;

  private popperNode: HTMLDivElement;

  private reference: HTMLElement;

  private arrowRef: HTMLSpanElement;

  private enterTimer: number;

  private leaveTimer: number;

  componentDidUpdate(prevProps: PopperProps) {
    const { direction, visible } = this.props;

    if (
      prevProps.visible !== visible
      || prevProps.direction !== direction
    ) {
      this.handleOpen();
    }
    if (prevProps.visible !== visible && !visible) {
      this.handleClose();
    }
  }

  componentWillUnmount() {
    this.handleClose();
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  }

  getPopperDomNode() {
    return this.popperNode;
  }

  handleOpen = () => {
    const { direction, hasArrow, arrowPointAtCenter, onVisibleChange } = this.props;
    const { visible } = this.state;
    const reference = this.reference as Element;
    const popperNode = this.popperNode as Element;

    if (!popperNode || !visible) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
      popperInstances.delete(this.popper);
      this.popper = null;
    }

    this.popper = new PopperJS(reference, popperNode, {
      placement: directionMap[direction!],
      positionFixed: true,
      modifiers: {
        preventOverflow: {
          boundariesElement: 'window',
        },
        arrow: {
          enabled: Boolean(this.arrowRef),
          element: this.arrowRef,
          ...(!(hasArrow && arrowPointAtCenter) && { fn: customArrowOffsetFn }),
        },
      },
      onCreate: this.handlePopperUpdate,
      onUpdate: this.handlePopperUpdate,
    });

    popperInstances.add(this.popper);

    onVisibleChange!(true);
  };

  handlePopperUpdate = (data) => {
    if (data.placement !== this.state.direction) {
      this.setState({
        direction: invertKeyValues(directionMap)[data.placement],
      });
    }
  };

  handleClose = () => {
    if (!this.popper) {
      return;
    }

    this.popper.destroy();
    popperInstances.delete(this.popper);
    this.popper = null;
    this.setState({ visible: false });
    this.props.onVisibleChange!(false);
  };

  handleClick = (event) => {
    const { trigger } = this.props;

    if (trigger === 'contextMenu') event.preventDefault();

    this.setState((preState: PopperState) => {
      return { visible: !preState.visible };
    }, () => {
      if (this.state.visible) {
        this.handleOpen();
      } else {
        this.handleClose();
      }
    });
  };

  handleEnter = (event) => {
    const { children, mouseEnterDelay } = this.props;
    const childrenProps = (children as React.ReactElement<any>).props;

    if (event.type === 'mouseover' && childrenProps.onMouseOver) {
      childrenProps.onMouseOver(event);
    }

    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    this.enterTimer = setTimeout(() => {
      this.setState({ visible: true }, this.handleOpen);
    }, mouseEnterDelay);
  };

  handleLeave = (event) => {
    const { children, mouseLeaveDelay } = this.props;
    const childrenProps = (children as React.ReactElement<any>).props;

    if (event.type === 'blur' && childrenProps.onBlur) {
      childrenProps.onBlur(event);
    }

    if (event.type === 'mouseleave' && childrenProps.onMouseLeave) {
      childrenProps.onMouseLeave(event);
    }

    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    this.leaveTimer = setTimeout(() => {
      this.setState({ visible: false }, this.handleClose);
    }, mouseLeaveDelay);
  };

  render() {
    const {
      children,
      content,
      prefixCls,
      style,
      className,
      trigger,
      hasArrow,
    } = this.props;

    const {
      visible,
      direction,
    } = this.state;

    const child = <div className={`${prefixCls}__inner`}>{children}</div>;
    const innerCls = classnames(`${prefixCls}__wrapper`, className, `${prefixCls}--${direction}`);
    const childrenProps: React.RefAttributes<any> & React.HTMLAttributes<any> = {
      ref: (node) => { this.reference = node; },
    };
    const event: React.DOMAttributes<HTMLDivElement> = {};
    if (trigger === 'click') {
      childrenProps.onClick = this.handleClick;
    }
    if (trigger === 'contextMenu') {
      childrenProps.onContextMenu = this.handleClick;
    }
    if (trigger === 'hover') {
      childrenProps.onMouseOver = this.handleEnter;
      childrenProps.onMouseLeave = this.handleLeave;
      event.onMouseOver = this.handleEnter;
      event.onMouseLeave = this.handleLeave;
    }
    if (trigger === 'focus') {
      childrenProps.onFocus = this.handleClick;
      // childrenProps.onBlur = this.handleLeave;
    }

    const childElement = React.cloneElement(child, childrenProps);
    const toolTip = (
      <ClickOutside
        onClickOutside={this.handleClose}
        ignoredNode={this.reference}
        className="popper-container"
        disabled={trigger === 'manual'}
      >
        <div
          role="tooltip"
          style={{ position: 'absolute' }}
          className={innerCls}
          ref={(node) => { this.popperNode = node!; }}
          {...event}
        >
          <div className={`${prefixCls}__content`}>{content}</div>
          {hasArrow && <span className={`${prefixCls}__arrow`} ref={(el) => { this.arrowRef = el!; }} />}
        </div>
      </ClickOutside>
    );

    return (
      <React.Fragment>
        <div className={prefixCls} style={style}>
          {visible ? createPortal(toolTip, document.body) : null}
          {childElement}
        </div>
      </React.Fragment>
    );
  }
}

export default Popper;
