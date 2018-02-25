import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseAccordionItemProps } from './PropsType';

export interface AccordionItemProps extends BaseAccordionItemProps {
  prefixCls?: string;
  className?: string;
}

export default class AccordionItem extends PureComponent<AccordionItemProps, any> {

  static defaultProps = {
    prefixCls: 'za-accordion',
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
    const { index, onItemChange, animated } = this.props;
    const { active } = this.state;

    this.setState({
      active: !active,
    });
    if (animated) {
      this.setStyle(active);
    }
    if (onItemChange) {
      onItemChange(index);
    }
  }

  isActive(props) {
    const { index, activeIndex = [] } = props;

    return activeIndex.indexOf(index) > -1;
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
    const { prefixCls, className, animated } = this.props;
    const { active } = this.state;

    const cls = classnames(`${prefixCls}-item`, className, {
      active,
    });
    const titleCls = `${prefixCls}-item-title`;
    const contentCls = classnames(`${prefixCls}-item-content`, {
      [`${prefixCls}-item-content-anim`]: animated,
    });
    const contentInnerCls = `${prefixCls}-item-content-inner`;
    const arrowCls = `${prefixCls}-item-arrow`;

    return { cls, titleCls, contentCls, contentInnerCls, arrowCls };
  }

  render() {
    const { title, children } = this.props;
    const { cls, titleCls, contentCls, contentInnerCls, arrowCls } = this.getCls();

    return (
      <div className={cls}>
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
