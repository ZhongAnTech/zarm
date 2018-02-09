import React, { PureComponent, Children, cloneElement } from 'react';
import classnames from 'classnames';
import Item from './Item';
import PropsType from './PropsType';
import { isArray } from '../utils/validate';

export interface AccordionProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

interface AccordionState {
  activeIndex: Array<string>;
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
      activeIndex: this.getDefaultactiveIndex(),
    };
  }

  onItemChange = (key) => {
    const { accordion, onChange } = this.props;
    const { activeIndex } = this.state;

    if (!accordion) {
      onChange(key);
      return;
    }
    if (activeIndex.indexOf(key) > -1) {
      this.setState({
        activeIndex: [],
      });
    } else {
      this.setState({
        activeIndex: [key],
      });
    }
    onChange(key);
  }

  getDefaultactiveIndex() {
    const { defaultActiveIndex, accordion } = this.props;

    if (defaultActiveIndex) {
      if (isArray(defaultActiveIndex)) {
        return accordion ?
        [String(defaultActiveIndex[0])] : (defaultActiveIndex as Array<any>).map(key => String(key));
      } else {
        return [String(defaultActiveIndex)];
      }
    }

    return [];
  }

  renderItems() {
    const { accordion, animated } = this.props;
    const { activeIndex } = this.state;

    return Children.map(this.props.children, (ele, index) => {

      return cloneElement(ele as JSX.Element, {
        index: String(index),
        accordion,
        animated,
        activeIndex,
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
