import React, { PureComponent, Children, cloneElement } from 'react';
import classnames from 'classnames';
import Item from './Item';
import PropsType from './PropsType';

export interface AccordionProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Accordion extends PureComponent<AccordionProps, any> {

  static defaultProps = {
    prefixCls: 'za-accordion',
    accordion: false,
  };

  static Item: any;

  constructor(props) {
    super(props);

    this.state = {
      activeKey: this.getDefaultActiveKey(),
    };
  }

  onItemChange = (key) => {
    const { activeKey } = this.state;
    if (activeKey.indexOf(key) > -1) {
      this.setState({
        activeKey: [],
      });
    } else {
      this.setState({
        activeKey: [key],
      });
    }
  }

  getDefaultActiveKey() {
    const { defaultActiveKey } = this.props;

    if (defaultActiveKey) {
      if (typeof defaultActiveKey === 'string') {
        return [defaultActiveKey];
      } else {
        return defaultActiveKey;
      }
    }

    return [];
  }

  renderItems() {
    const { accordion } = this.props;
    const { activeKey } = this.state;

    return Children.map(this.props.children, (ele, index) => {

      return cloneElement(ele as JSX.Element, {
        index: String(index),
        accordion,
        activeKey,
        onItemChange: this.onItemChange,
      });
    });
  }

  render() {
    const { prefixCls, className } = this.props;

    const cls = classnames(`${prefixCls}`, {
      [className as string]: !!className,
    });

    return (
      <div className={cls}>
          {this.renderItems()}
      </div>
    );
  }
}

Accordion.Item = Item;
