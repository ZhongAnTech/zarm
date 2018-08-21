import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseCollapseItemProps } from './PropsType';

export interface CollapseItemProps extends BaseCollapseItemProps {
  prefixCls?: string;
  className?: string;
}

export default class CollapseItem extends PureComponent<CollapseItemProps, any> {
  static defaultProps = {
    prefixCls: 'za-collapse',
  };

  private content;

  constructor(props) {
    super(props);

    this.state = {
      active: this.isActive(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { active } = this.state;
    const { animated } = nextProps;

    if (active !== this.isActive(nextProps)) {
      this.setState({
        active: !active,
      });
      if (animated) {
        this.setStyle(active);
      }
    }
  }

  onClickItem = () => {
    const { onItemChange, animated, disabled } = this.props;
    const { active } = this.state;
    if (disabled) {
      return;
    }
    this.setState({
      active: !active,
    });
    if (animated) {
      this.setStyle(active);
    }
    if (onItemChange) {
      onItemChange();
    }
  }

  isActive(props) {
    const { isActive } = props;
    return isActive;
  }

  setStyle(active) {
    const { content } = this;
    let height;

    if (active) {
      height = content.offsetHeight;
      content.style.height = `${height}px`;

      setTimeout(() => {
        content.style.height = '0px';
      }, 0);
    } else {
      content.style.height = '0px';

      setTimeout(() => {
        content.style.height = `${this.getContentHeight(content)}px`;
      }, 0);
    }
  }

  getContentHeight(content) {
    const children = [...content.children];
    return children.reduce((res, next) => {
      res += next.offsetHeight;
      return res;
    }, 0);
  }

  getCls() {
    const { prefixCls, className, animated, disabled } = this.props;
    const { active } = this.state;

    const cls = classnames(`${prefixCls}-item`, className, {
      active: active,
    });
    const titleCls = `${prefixCls}-item-title`;
    const contentCls = classnames(`${prefixCls}-item-content`, {
      [`${prefixCls}-item-content-anim`]: animated,
    });
    const contentInnerCls = `${prefixCls}-item-content-inner`;
    const arrowCls = classnames(`${prefixCls}-item-arrow`, {
      [`${prefixCls}-item-arrow-disabled`]: disabled,
    });

    return { cls, titleCls, contentCls, contentInnerCls, arrowCls };
  }

  render() {
    const { title, children, style } = this.props;
    const { cls, titleCls, contentCls, contentInnerCls, arrowCls } = this.getCls();

    return (
      <div className={cls} style={style}>
        <div
          className={titleCls}
          onClick={this.onClickItem}
        >
          <div>{title}</div>
          <div className={arrowCls} />
        </div>
        <div
          className={contentCls}
          ref={(content) => this.content = content}
        >
          <div className={contentInnerCls}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
