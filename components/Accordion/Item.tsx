import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { AccordionItemProps } from './PropsType';

interface AccordionItemState {
  active: boolean;
}

export default class Item extends PureComponent<AccordionItemProps, AccordionItemState> {

  static defaultProps = {
    prefixCls: 'za-accordion',
  };

  constructor(props) {
    super(props);

    this.state = {
      active: this.isActive(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        active: this.isActive(nextProps),
      });
    }
  }

  onToggleActive = () => {
    const { accordion, index, onItemChange } = this.props;

    this.setState({
      active: !this.state.active,
    });
    if (accordion && onItemChange) {
      onItemChange(index);
    }
  }

  isActive(props) {
    const { index, activeKey = [] } = props;

    return activeKey.indexOf(index) > -1;
  }

  getCls() {
    const { prefixCls, className } = this.props;
    const { active } = this.state;

    const cls = classnames(`${prefixCls}-item`, {
      active,
      [className as string]: !!className,
    });
    const titleCls = `${prefixCls}-item-title`;
    const contentCls = `${prefixCls}-item-content`;
    const arrowCls = `${prefixCls}-item-arrow`;

    return { cls, titleCls, contentCls, arrowCls };
  }

  render() {
    const { title, children } = this.props;
    const { cls, titleCls, contentCls, arrowCls } = this.getCls();

    return (
      <div className={cls}>
        <div
          className={titleCls}
          onClick={this.onToggleActive}
        >
          <div>{title}</div>
          <div className={arrowCls} />
        </div>
        <div className={contentCls}>
          {children}
        </div>
      </div>
    );
  }
}
