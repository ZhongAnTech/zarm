import React, { PureComponent, createRef } from 'react';
import classnames from 'classnames';
import { AffixProps } from './PropsType';

export interface AffixStates {
  top: number;
  affixed: boolean;
}

export default class Affix extends PureComponent<AffixProps, AffixStates> {
  static displayName = 'Affix';

  static defaultProps = {
    prefixCls: 'za-affix',
    target: () => window,
    offsetTop: 0,
  };

  private savePlaceholderNode = createRef<HTMLDivElement>();

  private saveFixedNode = createRef<HTMLDivElement>();

  state = {
    top: 10000,
    affixed: false,
  };

  componentDidMount() {
    // wait for ref not null
    setTimeout(() => {
      const { container, onPositionUpdate } = this;

      container.addEventListener('scroll', onPositionUpdate);
    });
  }

  componentWillUnmount() {
    setTimeout(() => {
      const { container, onPositionUpdate } = this;

      container.removeEventListener('scroll', onPositionUpdate);
    });
  }

  get container() {
    const { target } = this.props;
    const container = target!();

    return !container ? window : container;
  }

  get containerRect(): DOMRect {
    const { container } = this;

    return container !== window
      ? (container as HTMLElement).getBoundingClientRect()
      : { top: 0, bottom: container.innerHeight } as any;
  }

  get affixed() {
    const { containerRect } = this;
    const { offsetTop, offsetBottom } = this.props;
    const { top } = this.state;

    if (typeof offsetBottom !== 'undefined' && top + offsetBottom >= containerRect.bottom) {
      return true;
    }

    if (typeof offsetBottom === 'undefined' && typeof offsetTop !== 'undefined' && top - offsetTop <= containerRect.top) {
      return true;
    }

    return false;
  }

  get affixStyle(): React.CSSProperties {
    const { offsetTop, offsetBottom, onChange } = this.props;
    const { affixed } = this.state;

    if (this.affixed !== affixed) {
      this.setState({ affixed: this.affixed });
      onChange && onChange(this.affixed);
    }

    if (this.affixed && typeof offsetBottom !== 'undefined') {
      return {
        position: 'fixed',
        bottom: offsetBottom,
      };
    }

    if (this.affixed && typeof offsetTop !== 'undefined') {
      return {
        position: 'fixed',
        top: this.containerRect.top + offsetTop,
      };
    }

    return {};
  }

  onPositionUpdate = () => {
    const target = this.savePlaceholderNode.current!;
    const { top } = target.getBoundingClientRect()!;

    this.setState({ top });
  };

  render() {
    const {
      prefixCls,
      className,
      children,
    } = this.props;

    const cls = classnames(prefixCls, className);

    return (
      <div ref={this.savePlaceholderNode}>
        <div
          className={cls}
          ref={this.saveFixedNode}
          style={this.affixStyle}
        >
          {children}
        </div>
      </div>
    );
  }
}
