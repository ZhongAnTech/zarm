import React, { Component } from 'react';
import { findDOMNode, createPortal } from 'react-dom';
import classnames from 'classnames';
import Popper from './popper';
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

class Tootip extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'za-tooltip',
    className: null,
    visible: false,
    trigger: 'hover',
    direction: 'bottomRight',
    onVisibleChange: () => {},
    title: null,
  };

  private instance;
  private pop;
  private reference;
  private popper;
  private timer;
  private arrow;

  constructor(props) {
    super(props);
    this.state = {
      visible: !!props.visible,
    };
  }

  componentDidMount() {
    const { instance, pop } = this;
    const reference = findDOMNode(this.reference);
    const { trigger } = this.props;
    if (trigger === 'click') {
      Events.on(reference, 'click', () => {
        this.setState({
          visible: !this.state.visible,
        });
      });
      Events.on(document, 'click', ({ target }) => {
        if (
          !instance ||
          instance.contains(target) ||
          !reference ||
          reference.contains(target) ||
          !pop ||
          pop.contains(target) ||
          !this.popper
        ) {
          return;
        }
        this.hidePop();
      });
    } else {
      Events.on(reference, 'mouseenter', () => {
        this.showPop();
      });
      Events.on(reference, 'mouseleave', () => {
        this.hidePop();
      });
      Events.on(pop, 'mouseenter', () => {
        this.showPop();
      });
      Events.on(pop, 'mouseleave', () => {
        this.hidePop();
      });
    }
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.visible !== nextProps.visible) {
      this.setState({
        visible: !!nextProps.visible,
      });
    }
  }

  componentDidUpdate() {
    const { visible } = this.state;
    const { direction, onVisibleChange } = this.props;
    const reference = findDOMNode(this.reference);

    if (visible) {
      if (this.popper) {
        this.popper.update();
      } else {
        if (this.arrow) {
          this.arrow.setAttribute('x-arrow', '');
        }
        this.popper = new Popper(reference, this.pop, {
          placement: directMap[direction],
        });
      }
    } else {
      if (this.popper) {
        this.popper.destroy();
      }
      delete this.popper;
    }
    if (!!onVisibleChange) {
      onVisibleChange(visible);
    }
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
    delete this.popper;
  }

  showPop() {
    clearTimeout(this.timer);
    this.setState({
      visible: true,
    });
  }

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
    const child = React.isValidElement(children) ? (
      children
    ) : (
      <span>{children}</span>
    );
    const popContent = typeof title === 'function' ? title() : title;
    const cls = classnames(prefixCls, {
      [className!]: !!className,
    });
    const contentCls = classnames({
      [`${prefixCls}-content`]: true,
      [`${prefixCls}-content-show`]: visible,
    });
    const dd = () => {
      return (
        <div
          className={contentCls}
          ref={(pop) => { this.pop = pop; }}
        >
          {popContent}
          <span
            className={`${prefixCls}-arrow`}
            ref={(arrow) => { this.arrow = arrow; }}
          />
        </div>
      );
    };
    return (
      <div
        className={cls}
        // tslint:disable-next-line:jsx-no-multiline-js
        ref={(instance) => {
          this.instance = instance;
        }}
      >
        {createPortal(dd(), document.body)}
        {React.cloneElement(child, { ref: (reference) => { this.reference = reference; } })}
      </div>
    );
  }
}

export default Tootip;
