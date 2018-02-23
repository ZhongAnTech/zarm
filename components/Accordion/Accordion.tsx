import React, { PureComponent, Children, cloneElement } from 'react';
import classnames from 'classnames';
import { BaseAccordionProps } from './PropsType';
import { isArray } from '../utils/validate';

export interface AccordionProps extends BaseAccordionProps {
  prefixCls?: string;
  className?: string;
}

export default class Accordion extends PureComponent<AccordionProps, any> {

  static defaultProps = {
    prefixCls: 'za-accordion',
    accordion: false,
    animated: false,
    open: false,
    onChange: () => {},
  };

  static Item: any;

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: this.getActiveIndex(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.isPropEqual(this.props.activeIndex, nextProps.activeIndex)) {
      this.setState({
        activeIndex: this.getActiveIndex(nextProps),
      });
    }
  }

  onItemChange = (key) => {
    const { accordion, onChange } = this.props;
    const { activeIndex } = this.state;
    const hasKey = activeIndex.indexOf(key) > -1;

    if (!accordion) {
      this.setState({
        activeIndex: hasKey ? activeIndex.filter(i => i !== key) : [...activeIndex, key],
      });
    } else {
      this.setState({
        activeIndex: hasKey ? [] : [key],
      });
    }
    onChange(Number(key));
  }

  getActiveIndex(props) {
    const { activeIndex, defaultActiveIndex, accordion } = props;

    const defaultIndex = (activeIndex || activeIndex === 0) ? activeIndex : defaultActiveIndex;

    if (defaultIndex || defaultIndex === 0) {
      if (isArray(defaultIndex)) {
        return accordion ?
        [String(defaultIndex[0])] : (defaultIndex as Array<any>).map(key => String(key));
      } else {
        return [String(defaultIndex)];
      }
    }

    return [];
  }

  isPropEqual(cur, next) {
    if (isArray(next) && isArray(cur)) {
     return next.length === cur.length && next.every((key, i) => key === cur[i]);
    }

    return cur === next;
  }

  renderItems() {
    const { accordion, animated, open } = this.props;
    const { activeIndex } = this.state;

    return Children.map(this.props.children, (ele, index) => {

      return cloneElement(ele as JSX.Element, {
        index: String(index),
        accordion,
        animated,
        activeIndex,
        open,
        onItemChange: this.onItemChange,
      });
    });
  }

  render() {
    const { prefixCls, className } = this.props;
    const cls = classnames(`${prefixCls}`, className);

    return (
      <div className={cls}>
        {this.renderItems()}
      </div>
    );
  }
}
