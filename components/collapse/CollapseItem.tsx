import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseCollapseItemProps } from './PropsType';

export interface CollapseItemProps extends BaseCollapseItemProps {
  prefixCls?: string;
  className?: string;
}

export default class CollapseItem extends PureComponent<CollapseItemProps, any> {
  static defaultProps = {
    prefixCls: 'za-collapse-item',
    animated: false,
    disabled: false,
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
    const { itemKey, onItemChange, animated, disabled } = this.props;
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
    if (typeof onItemChange === 'function') {
      onItemChange(itemKey);
    }
  };

  setStyle = (active) => {
    if (active) {
      this.content.style.height = `${this.content.offsetHeight}px`;

      setTimeout(() => {
        this.content.style.height = '0px';
      }, 0);
    } else {
      this.content.style.height = '0px';

      setTimeout(() => {
        this.content.style.height = `${this.getContentHeight(this.content)}px`;
      }, 0);
    }
  };

  getContentHeight = (content) => {
    const children = [...content.children];
    return children.reduce((res, next) => {
      res += next.offsetHeight;
      return res;
    }, 0);
  };

  isActive = (props) => {
    return props.isActive;
  };

  render() {
    const { title, children, style } = this.props;
    const { prefixCls, className, disabled } = this.props;
    const { active } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--active`]: active,
      [`${prefixCls}--disabled`]: disabled,
    });

    return (
      <div className={cls} style={style}>
        <div
          className={`${prefixCls}__title`}
          onClick={this.onClickItem}
        >
          <div>{title}</div>
          <div className={`${prefixCls}__arrow`} />
        </div>
        <div
          className={`${prefixCls}__content`}
          ref={(content) => { this.content = content; }}
        >
          <div className={`${prefixCls}__content__inner`}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
