import React, { Component, cloneElement, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import Popper from './Popper';
import Events from '../utils/events';
import PropsType from './PropsType';

const directMap = {
  top: 'top',
  topLeft: 'top-start',
  topRight: 'top-end',
  right: 'right',
  rightTop: 'right-start',
  rightBottom: 'right-end',
  bottom: 'bottom',
  bottomLeft: 'bottom-start',
  bottomRight: 'bottom-end',
  left: 'left',
  leftTop: 'left-start',
  leftBottom: 'left-end',
};

class Tooltip extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'za-tooltip',
    visible: false,
    trigger: /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? 'click' : 'hover',
    direction: 'top',
    onVisibleChange: () => {},
  };

  private instance;

  private pop;

  private reference;

  private popper;

  private timer;

  // private abs;

  constructor(props) {
    super(props);
    this.state = {
      visible: !!props.visible,
      // placement: props.direction,
      arrowElement: `#${props.prefixCls}-arrow`,
    };
  }

  componentDidMount() {
    this.initEvent();
    // Events.on(window, 'resize', this.onSetDirection);
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.state;
    if (visible !== nextProps.visible) {
      this.setState({
        visible: !!nextProps.visible,
      });
    }
  }

  componentDidUpdate() {
    const { visible, arrowElement } = this.state;
    const { direction, onVisibleChange } = this.props;

    if (visible) {
      if (this.popper) {
        this.popper.update();
      } else {
        this.popper = new Popper(this.reference, this.pop, {
          placement: directMap[direction],
          arrowElement,
        });
      }
    } else {
      if (this.popper) {
        this.popper.destroy();
      }
      delete this.popper;
    }

    onVisibleChange && onVisibleChange(visible);
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
    delete this.popper;

    // 移除绑定事件
    // Events.off(window, 'resize', this.onSetDirection);
  }

  initEvent() {
    const { visible } = this.state;
    const { trigger } = this.props;

    if (trigger === 'click') {
      Events.on(this.reference, 'click', () => {
        this.setState({
          visible: !visible,
        });
      });
      Events.on(document, 'click', ({ target }) => {
        if (
          !this.instance
          || this.instance.contains(target)
          || !this.reference
          || this.reference.contains(target)
          || !this.pop
          || this.pop.contains(target)
          || !this.popper
        ) {
          return;
        }
        this.hidePop();
      });
    } else {
      Events.on(this.reference, 'mouseenter', () => {
        this.showPop();
      });
      Events.on(this.reference, 'mouseleave', () => {
        this.hidePop();
      });
      Events.on(this.pop, 'mouseenter', () => {
        this.showPop();
      });
      Events.on(this.pop, 'mouseleave', () => {
        this.hidePop();
      });
    }
  }

  showPop() {
    clearTimeout(this.timer);
    this.setState({
      visible: true,
    });
  }

  // 修正方向
  // onSetDirection = () => {
  //   if ( !this.reference && !this.pop ) { return false; }
  //   const { direction } = this.props;
  //   const { placement } = this.state;
  //   const referenceRc = this.reference.getBoundingClientRect();
  //   const popRc = this.pop.getBoundingClientRect();
  //   const dirArray = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };

  //   let _direction = !this.abs ? direction : placement;
  //   let first = directMap[_direction].split('-')[0];
  //   let hash = _direction.replace(/left|right|bottom|top/g, (matched) => {
  //     return dirArray[matched];
  //   });

  //   const last = dirArray[first];
  //   const range = referenceRc[last] - popRc[first];

  //   if (!this.abs) { this.abs = false; }
  //   if (Math.abs(range) < 5) {
  //     this.abs = true;
  //     this.setState({
  //       placement: hash,
  //     });
  //   }
  // }

  hidePop() {
    const { trigger } = this.props;
    if (trigger === 'click') {
      this.setState({
        visible: false,
      });
      return;
    }
    this.timer = setTimeout(() => {
      this.setState({
        visible: false,
      });
    }, 200);
  }

  render() {
    const { visible } = this.state;
    const {
      children,
      title,
      prefixCls,
      className,
    } = this.props;

    const popContent = typeof title === 'function' ? title() : title;
    const cls = classnames(prefixCls, className);

    const contentCls = classnames(`${prefixCls}__content`, {
      [`${prefixCls}__content--show`]: visible,
    });

    const inner = () => {
      return (
        <div
          className={contentCls}
          ref={(pop) => { this.pop = pop; }}
        >
          {popContent}
          <span
            className={`${prefixCls}__arrow`}
            id={`${prefixCls}-arrow`}
          />
        </div>
      );
    };

    const subElement = <span className={`${prefixCls}__inner`}>{children}</span> as ReactElement<any>;

    return (
      <div
        className={cls}
        ref={(instance) => { this.instance = instance; }}
      >
        {createPortal(inner(), document.body)}
        {cloneElement(subElement, { ref: (reference) => { this.reference = reference; } })}
      </div>
    );
  }
}

export default Tooltip;
