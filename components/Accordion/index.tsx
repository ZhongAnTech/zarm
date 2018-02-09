import React, { PureComponent, Children, cloneElement } from 'react';
import classnames from 'classnames';
import Item from './Item';
import PropsType from './PropsType';

export interface AccordionProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

interface AccordionState {
  activeKey: Array<string>;
}

export default class Accordion extends PureComponent<AccordionProps, AccordionState> {

  static defaultProps = {
    prefixCls: 'za-accordion',
    accordion: false,
    animated: false,
    onChange: () => {},
  };

  static Item: any;

  constructor(props) {
    super(props);

    this.state = {
      activeKey: this.getDefaultActiveKey(),
    };
  }

  onItemChange = (key) => {
    const { accordion, onChange } = this.props;
    const { activeKey } = this.state;

    if (!accordion) {
      onChange(key);
      return;
    }
    if (activeKey.indexOf(key) > -1) {
      this.setState({
        activeKey: [],
      });
    } else {
      this.setState({
        activeKey: [key],
      });
    }
    onChange(key);
  }

  getDefaultActiveKey() {
    const { defaultActiveKey, accordion } = this.props;

    if (defaultActiveKey) {
      if (typeof defaultActiveKey === 'string') {
        return [defaultActiveKey];
      } else {
        return accordion ? [defaultActiveKey[0]] : defaultActiveKey;
      }
    }

    return [];
  }

  renderItems() {
    const { accordion, animated } = this.props;
    const { activeKey } = this.state;

    return Children.map(this.props.children, (ele, index) => {

      return cloneElement(ele as JSX.Element, {
        index: String(index),
        accordion,
        animated,
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
