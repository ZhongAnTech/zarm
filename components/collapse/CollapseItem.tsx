import React, { HTMLAttributes, PureComponent } from 'react';
import classnames from 'classnames';
import { BaseCollapseItemProps } from './PropsType';

export interface CollapseItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'key' | 'title' | 'onChange'>, BaseCollapseItemProps {
  prefixCls?: string;
}

interface CollapseItemStates {
  active?: boolean;
  prevActive?: boolean;
}

export default class CollapseItem extends PureComponent<CollapseItemProps, CollapseItemStates> {
  static defaultProps = {
    prefixCls: 'za-collapse-item',
    animated: false,
    disabled: false,
  };

  private content: HTMLDivElement | null;

  state: CollapseItemStates = {
    active: this.props.isActive,
  };

  static getDerivedStateFromProps(nextProps, state) {
    if ('isActive' in nextProps && nextProps.isActive !== state.prevActive) {
      return {
        active: nextProps.isActive,
        prevActive: nextProps.isActive,
      };
    }

    return null;
  }

  componentDidMount() {
    this.setStyle();
  }

  componentDidUpdate() {
    this.setStyle();
  }

  onClickItem = () => {
    const { onChange, disabled } = this.props;
    const { active } = this.state;
    if (disabled) return;
    typeof onChange === 'function' && onChange(active);
  };

  setStyle = () => {
    if (!this.content) return;

    const { active } = this.state;
    this.content.style.height = active ? `${this.getContentHeight(this.content)}px` : '0px';
  };

  getContentHeight = (content) => {
    const children = [...content.children];
    return children.reduce((res, next) => {
      res += next.offsetHeight;
      return res;
    }, 0);
  };

  render() {
    const { prefixCls, title, className, disabled, animated, isActive, children, onChange, ...rest } = this.props;
    const { active } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--active`]: active,
      [`${prefixCls}--disabled`]: disabled,
    });
    return (
      <div className={cls} {...rest}>
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
