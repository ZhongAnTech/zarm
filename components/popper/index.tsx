import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import classnames from 'classnames';

import ClickOutside from '../click-outside';
import { invertKeyValues } from '../utils';
import domUtil from '../utils/dom';
import { PopperState, PopperProps, directionMap } from './PropsType';

function getPopperClientRect(popperOffsets) {
  const offsets = { ...popperOffsets };
  offsets.right = offsets.left + offsets.width;
  offsets.bottom = offsets.top + offsets.height;
  return offsets;
}

function customArrowOffsetFn(data: PopperJS.Data) {
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
    start: reference[side] + offsetSize,
    center: reference[side] + reference[len] / 2 - arrowSize / 2,
    end: reference[opSide] - offsetSize - arrowSize,
  };
  const place = hashMap[placement1 || 'center'];
  const sideValue = place - popper[side];

  data.arrowElement = arrow!;
  data.arrowStyles[side] = Math.floor(sideValue).toString();
  data.arrowStyles[altSide] = '';

  return data;
}

class Popper extends React.Component<PopperProps, PopperState> {
  static defaultProps = {
    prefixCls: 'za-popper',
    hasArrow: false,
    trigger: 'hover',
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
    trigger: PropTypes.oneOf(['click', 'hover', 'focus', 'manual']),
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

  componentDidUpdate(prevProps: PopperProps, prevState: PopperState) {
    const { visible } = this.state;
    const { direction } = this.props;
    if (
      (!prevState.visible && prevState.visible !== visible) || (prevProps.direction !== direction)
    ) {
      this.handleOpen();
    }
    if (prevState.visible && prevState.visible !== visible) {
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
    const { direction, onVisibleChange } = this.props;
    const { visible } = this.state;
    const reference = ReactDOM.findDOMNode(this.reference) as Element; // eslint-disable-line
    const popperNode = ReactDOM.findDOMNode(this.popperNode) as Element; // eslint-disable-line

    if (!popperNode || !visible) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
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
          fn: customArrowOffsetFn,
        },
      },
      onCreate: this.handlePopperUpdate,
      onUpdate: this.handlePopperUpdate,
    });

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
    this.popper = null;
    this.setState({ visible: false });
    this.props.onVisibleChange!(false);
  };

  handleClick = () => {
    this.setState((preState: PopperState) => ({ visible: !preState.visible }));
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
      this.setState({ visible: true });
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
      this.setState({ visible: false });
    }, mouseLeaveDelay);
  };

  render() {
    const {
      children,
      title,
      content,
      prefixCls,
      style,
      className,
      wrapperCls,
      trigger,
      hasArrow,
    } = this.props;

    const {
      visible,
      direction,
    } = this.state;

    const child = <div className={`${prefixCls}__inner`}>{children}</div>;
    const outerCls = classnames(prefixCls, className);
    const innerCls = classnames(`${prefixCls}__wrapper`, wrapperCls, `${prefixCls}--${direction}`);
    const childrenProps: React.RefAttributes<any> & React.HTMLAttributes<any> = {
      ref: (node) => { this.reference = node; },
    };
    const event: React.DOMAttributes<HTMLDivElement> = {};
    if (trigger === 'click') {
      childrenProps.onClick = this.handleClick;
    }
    if (trigger === 'hover') {
      childrenProps.onMouseOver = this.handleEnter;
      childrenProps.onMouseLeave = this.handleLeave;
      event.onMouseOver = this.handleEnter;
      event.onMouseLeave = this.handleLeave;
    }
    if (trigger === 'focus') {
      childrenProps.onFocus = this.handleEnter;
      childrenProps.onBlur = this.handleLeave;
    }

    const childElement = React.cloneElement(child, childrenProps);
    const toolTip = (
      <ClickOutside onClickOutside={this.handleClose} disabled={trigger === 'manual'}>
        <div
          role="tooltip"
          style={{ position: 'absolute' }}
          className={innerCls}
          ref={(node) => { this.popperNode = node!; }}
          {...event}
        >
          {title && <div className={`${prefixCls}__title`}>{title}</div>}
          <div className={`${prefixCls}__content`}>{content}</div>
          {hasArrow && <span className={`${prefixCls}__arrow`} ref={(el) => { this.arrowRef = el!; }} />}
        </div>
      </ClickOutside>
    );

    return (
      <React.Fragment>
        <div className={outerCls} style={style}>
          {visible ? createPortal(toolTip, document.body) : null}
          {childElement}
        </div>
      </React.Fragment>
    );
  }
}

export default Popper;
